'use client'

import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { useState, useRef } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useGallery } from '@/hooks/useGallery'
import { BirthdayData } from '@/lib/types'

interface GalleryProps {
  data: BirthdayData
}

export function Gallery({ data }: GalleryProps) {
  const { photos, addPhoto, deletePhoto } = useGallery()
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>('')

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      addPhoto(url)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-white">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Photo Gallery 📸
          </h2>
          <p className="text-gray-600 text-lg">Cherish your precious moments</p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          variants={fadeUpVariants}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center mb-12 transition-colors ${
            dragActive
              ? 'border-pink-500 bg-pink-50'
              : 'border-pink-300 bg-white hover:bg-pink-50'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto text-pink-400 mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">Drag and drop your photos</p>
          <p className="text-gray-500 mb-4">or click to select</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            onClick={() => setError('')}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            Choose File
          </button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </motion.div>

        {/* Photos Masonry Grid */}
        <motion.div
          variants={staggerContainerVariants}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={staggerItemVariants}
              className="relative break-inside-avoid group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={photo.url}
                alt="Gallery photo"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition-opacity hover:bg-red-600"
                  aria-label="Delete photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {photos.length === 0 && (
          <motion.div variants={fadeUpVariants} className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No photos yet. Start by uploading one!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
