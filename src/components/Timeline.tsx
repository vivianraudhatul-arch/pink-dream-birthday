'use client'

import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { useState, useRef } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useTimeline } from '@/hooks/useTimeline'
import { BirthdayData } from '@/lib/types'

interface TimelineProps {
  data: BirthdayData
}

export function Timeline({ data }: TimelineProps) {
  const { timeline, addEntry, updateEntry, deleteEntry } = useTimeline()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ year: '', title: '', description: '', image: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddEntry = () => {
    if (formData.year && formData.title && formData.description && formData.image) {
      addEntry(formData)
      setFormData({ year: '', title: '', description: '', image: '' })
      setIsAdding(false)
    }
  }

  const handleUpdateEntry = (id: string) => {
    updateEntry(id, formData)
    setEditingId(null)
    setFormData({ year: '', title: '', description: '', image: '' })
  }

  const startEdit = (id: string, year: string, title: string, description: string, image: string) => {
    setEditingId(id)
    setFormData({ year, title, description, image })
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Timeline Memories ⏰
          </h2>
          <p className="text-gray-600 text-lg">Journey through precious moments</p>
        </motion.div>

        {/* Add Timeline Entry Form */}
        {isAdding && (
          <motion.div
            variants={fadeUpVariants}
            className="bg-white rounded-lg shadow-lg p-6 mb-12 border-2 border-pink-200"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              {formData.image && <span className="text-sm text-gray-600">✓ Image uploaded</span>}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddEntry}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Entry
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setFormData({ year: '', title: '', description: '', image: '' })
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-pink-500 hidden md:block"></div>

          <motion.div variants={staggerContainerVariants} className="space-y-8">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.id}
                variants={staggerItemVariants}
                className={`md:flex gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-start">
                  {editingId === entry.id ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full border-2 border-pink-200">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="px-2 py-1 border border-pink-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="px-2 py-1 border border-pink-300 rounded text-sm"
                        />
                      </div>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-2 py-1 border border-pink-300 rounded text-sm mb-2 h-16"
                      />
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Change Image
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateEntry(entry.id)}
                          className="flex-1 bg-pink-500 text-white py-1 rounded text-sm hover:bg-pink-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-300 text-gray-700 py-1 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-2xl font-bold text-pink-600 mb-2">{entry.year}</p>
                        <h3 className="font-bold text-gray-800 mb-2">{entry.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{entry.description}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(entry.id, entry.year, entry.title, entry.description, entry.image)}
                            className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Add Entry Button */}
        {!isAdding && (
          <motion.button
            variants={fadeUpVariants}
            onClick={() => setIsAdding(true)}
            className="block mx-auto mt-12 bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
          >
            + Add Timeline Entry
          </motion.button>
        )}

        {/* Empty State */}
        {timeline.length === 0 && !isAdding && (
          <motion.div variants={fadeUpVariants} className="text-center py-16">
            <p className="text-gray-500 text-lg">No timeline entries yet. Create one to get started!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
