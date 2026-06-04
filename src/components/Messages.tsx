'use client'

import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useState } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useMessages } from '@/hooks/useMessages'
import { BirthdayData } from '@/lib/types'

interface MessagesProps {
  data: BirthdayData
}

export function Messages({ data }: MessagesProps) {
  const { messages, addMessage, updateMessage, deleteMessage } = useMessages()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', message: '' })

  const handleAddMessage = () => {
    if (formData.title && formData.message) {
      addMessage(formData)
      setFormData({ title: '', message: '' })
      setIsAdding(false)
    }
  }

  const handleUpdateMessage = (id: string) => {
    updateMessage(id, formData)
    setEditingId(null)
    setFormData({ title: '', message: '' })
  }

  const startEdit = (id: string, title: string, message: string) => {
    setEditingId(id)
    setFormData({ title, message })
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-dancing text-pink-600 mb-4">
            Birthday Wishes 💌
          </h2>
          <p className="text-gray-600 text-lg">Messages filled with love and warmth</p>
        </motion.div>

        {/* Add Message Form */}
        {isAdding && (
          <motion.div
            variants={fadeUpVariants}
            className="bg-white rounded-lg shadow-lg p-6 mb-12 max-w-2xl mx-auto border-2 border-pink-200"
          >
            <input
              type="text"
              placeholder="Message Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddMessage}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Message
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setFormData({ title: '', message: '' })
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Messages Grid */}
        <motion.div
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={staggerItemVariants}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow"
            >
              {editingId === msg.id ? (
                <div>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-2 py-1 border border-pink-300 rounded mb-2 text-sm"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-2 py-1 border border-pink-300 rounded mb-2 h-24 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateMessage(msg.id)}
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
                <>
                  <h3 className="text-xl font-bold text-pink-600 mb-2">{msg.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{msg.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(msg.id, msg.title, msg.message)}
                      className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Message Button */}
        {!isAdding && (
          <motion.button
            variants={fadeUpVariants}
            onClick={() => setIsAdding(true)}
            className="block mx-auto bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
          >
            + Add Message
          </motion.button>
        )}

        {/* Empty State */}
        {messages.length === 0 && !isAdding && (
          <motion.div variants={fadeUpVariants} className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-pink-300 mb-4" />
            <p className="text-gray-500 text-lg">No messages yet. Add one to get started!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
