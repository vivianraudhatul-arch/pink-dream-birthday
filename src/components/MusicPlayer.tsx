'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, RotateCcw, Upload } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { BirthdayData } from '@/lib/types'

interface MusicPlayerProps {
  data: BirthdayData
}

export function MusicPlayer({ data }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [musicUrl, setMusicUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setMusicUrl(url)
        if (audioRef.current) {
          audioRef.current.src = url
        }
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    if (!musicUrl) return
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-white">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Birthday Soundtrack 🎵
          </h2>
          <p className="text-gray-600 text-lg">Play your favorite birthday music</p>
        </motion.div>

        {/* Music Player Card */}
        <motion.div
          variants={fadeUpVariants}
          className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg shadow-lg p-8 border-2 border-pink-200"
        >
          <audio ref={audioRef} />

          {!musicUrl ? (
            <div className="text-center mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-pink-600 transition-colors text-lg font-semibold"
              >
                <Upload className="w-6 h-6" />
                Upload Music
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-gray-600 mt-4 text-sm">Supports MP3, WAV, and other audio formats</p>
            </div>
          ) : (
            <>
              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0
                      setCurrentTime(0)
                      setIsPlaying(false)
                    }
                  }}
                  className="p-3 rounded-full bg-pink-300 text-white hover:bg-pink-400 transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-pink-600" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const vol = parseFloat(e.target.value)
                      setVolume(vol)
                      if (audioRef.current) {
                        audioRef.current.volume = vol
                      }
                    }}
                    className="w-24 h-2 bg-pink-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-pink-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Upload New */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Change Music
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}
        </motion.div>

        {/* Empty State */}
        {!musicUrl && (
          <motion.div variants={fadeUpVariants} className="text-center mt-8">
            <p className="text-gray-500 text-lg">No music uploaded yet</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
