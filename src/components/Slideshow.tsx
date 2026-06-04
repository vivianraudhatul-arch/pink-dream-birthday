'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useGallery } from '@/hooks/useGallery'
import { useTimeline } from '@/hooks/useTimeline'
import { BirthdayData } from '@/lib/types'

interface SlideshowProps {
  data: BirthdayData
}

export function Slideshow({ data }: SlideshowProps) {
  const { photos } = useGallery()
  const { timeline } = useTimeline()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Combine photos and timeline images
  const allImages = [
    ...photos.map((p) => ({ url: p.url, type: 'photo' as const })),
    ...timeline.map((t) => ({ url: t.image, type: 'timeline' as const, title: t.title })),
  ]

  useEffect(() => {
    if (!isAutoPlay || allImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, allImages.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    )
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
    setIsAutoPlay(false)
  }

  if (allImages.length === 0) {
    return (
      <section className="min-h-screen py-20 px-4 bg-white flex items-center justify-center">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Memory Slideshow 🎬
          </h2>
          <p className="text-gray-500 text-lg mt-8">Upload photos to see the slideshow</p>
        </motion.div>
      </section>
    )
  }

  const currentImage = allImages[currentIndex]

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Memory Slideshow 🎬
          </h2>
          <p className="text-gray-600 text-lg">Relive your beautiful moments</p>
        </motion.div>

        {/* Slideshow Container */}
        <motion.div
          variants={fadeUpVariants}
          className="relative rounded-lg overflow-hidden shadow-2xl bg-black aspect-video flex items-center justify-center"
        >
          <motion.img
            key={currentIndex}
            src={currentImage.url}
            alt="Slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />

          {/* Title Overlay */}
          {currentImage.type === 'timeline' && currentImage.title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white"
            >
              <p className="text-2xl font-bold">{currentImage.title}</p>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors"
          >
            {isAutoPlay ? '⏸ Pause' : '▶ Play'}
          </button>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div variants={fadeUpVariants} className="mt-8 flex justify-center gap-2 flex-wrap">
          {allImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-pink-500 w-8'
                  : 'bg-pink-300 hover:bg-pink-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Counter */}
        <motion.div variants={fadeUpVariants} className="text-center mt-6">
          <p className="text-gray-600 font-semibold">
            {currentIndex + 1} / {allImages.length}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
