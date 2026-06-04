'use client'

import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { useState, useRef } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useGiftBoxes } from '@/hooks/useGiftBoxes'
import { BirthdayData } from '@/lib/types'

interface GiftBoxesProps {
  data: BirthdayData
}

export function GiftBoxes({ data }: GiftBoxesProps) {
  const { giftBoxes, addGiftBox, updateGiftBox, deleteGiftBox } = useGiftBoxes()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', image: '', content: '' })
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

  const handleAddGiftBox = () => {
    if (formData.title && formData.image && formData.content) {
      addGiftBox(formData)
      setFormData({ title: '', image: '', content: '' })
      setIsAdding(false)
    }
  }

  const handleUpdateGiftBox = (id: string) => {
    updateGiftBox(id, formData)
    setEditingId(null)
    setFormData({ title: '', image: '', content: '' })
  }

  const startEdit = (id: string, title: string, image: string, content: string) => {
    setEditingId(id)
    setFormData({ title, image, content })
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Gift Boxes 🎁
          </h2>
          <p className="text-gray-600 text-lg">Secret gifts with special messages</p>
        </motion.div>

        {/* Add Gift Box Form */}
        {isAdding && (
          <motion.div
            variants={fadeUpVariants}
            className="bg-white rounded-lg shadow-lg p-6 mb-12 max-w-2xl mx-auto border-2 border-pink-200"
          >
            <input
              type="text"
              placeholder="Gift Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Secret Message"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
              {formData.image && <span className="text-sm text-gray-600 flex items-center">✓ Image uploaded</span>}
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
                onClick={handleAddGiftBox}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Gift Box
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setFormData({ title: '', image: '', content: '' })
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Gift Boxes Grid */}
        <motion.div
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {giftBoxes.map((box) => (
            <motion.div key={box.id} variants={staggerItemVariants}>
              {editingId === box.id ? (
                <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-pink-200">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-2 py-1 border border-pink-300 rounded mb-2 text-sm"
                  />
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-2 py-1 border border-pink-300 rounded mb-2 h-16 text-sm"
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
                      onClick={() => handleUpdateGiftBox(box.id)}
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
                <motion.div
                  onClick={() => setSelectedId(selectedId === box.id ? null : box.id)}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer group"
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-64 bg-gradient-to-br from-pink-300 to-pink-500">
                    <img
                      src={box.image}
                      alt={box.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-2xl mb-2">🎁</p>
                        <p className="font-semibold">Click to Open</p>
                      </div>
                    </div>
                  </div>

                  {/* Gift Content Reveal */}
                  {selectedId === box.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 bg-white rounded-lg shadow-lg p-4 border-2 border-pink-300"
                    >
                      <h3 className="text-lg font-bold text-pink-600 mb-2">{box.title}</h3>
                      <p className="text-gray-700 text-sm mb-4">{box.content}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(box.id, box.title, box.image, box.content)}
                          className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteGiftBox(box.id)}
                          className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Add Gift Button */}
        {!isAdding && (
          <motion.button
            variants={fadeUpVariants}
            onClick={() => setIsAdding(true)}
            className="block mx-auto bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
          >
            + Add Gift Box
          </motion.button>
        )}

        {/* Empty State */}
        {giftBoxes.length === 0 && !isAdding && (
          <motion.div variants={fadeUpVariants} className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No gift boxes yet</p>
            <p className="text-gray-400">Create gift boxes with special messages!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
