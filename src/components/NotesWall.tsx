'use client'

import { motion } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { useState } from 'react'
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { useNotes } from '@/hooks/useNotes'
import { BirthdayData } from '@/lib/types'

interface NotesWallProps {
  data: BirthdayData
}

export function NotesWall({ data }: NotesWallProps) {
  const { notes, addNote, updateNote, deleteNote } = useNotes()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [content, setContent] = useState('')

  const colors = [
    'bg-yellow-100',
    'bg-pink-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
  ]

  const handleAddNote = () => {
    if (content.trim()) {
      addNote({
        content,
        rotation: Math.random() * 20 - 10,
        x: Math.random() * 80,
        y: Math.random() * 80,
      })
      setContent('')
      setIsAdding(false)
    }
  }

  const handleUpdateNote = (id: string) => {
    updateNote(id, { content })
    setEditingId(null)
    setContent('')
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
            Love Notes Wall 📝
          </h2>
          <p className="text-gray-600 text-lg">Messages of love and appreciation</p>
        </motion.div>

        {/* Add Note Form */}
        {isAdding && (
          <motion.div
            variants={fadeUpVariants}
            className="max-w-md mx-auto mb-12 bg-white rounded-lg shadow-lg p-6 border-2 border-pink-200"
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your love note..."
              className="w-full px-4 py-2 border border-pink-300 rounded-lg mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddNote}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Note
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setContent('')
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Notes Wall */}
        <motion.div
          variants={staggerContainerVariants}
          className="relative h-96 md:h-screen bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg overflow-hidden border-4 border-pink-300 shadow-lg"
        >
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: `${note.x}%`,
                top: `${note.y}%`,
                rotate: note.rotation,
              }}
              className={`${colors[index % colors.length]} w-32 h-32 p-3 rounded-lg shadow-lg cursor-move hover:shadow-xl transition-shadow group`}
            >
              {editingId === note.id ? (
                <div className="h-full flex flex-col">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 text-xs border border-gray-300 rounded p-1 focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => handleUpdateNote(note.id)}
                      className="flex-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-400 text-white text-xs rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-800 mb-2 line-clamp-4 font-medium">
                    {note.content}
                  </p>
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => {
                        setEditingId(note.id)
                        setContent(note.content)
                      }}
                      className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Note Button */}
        {!isAdding && (
          <motion.button
            variants={fadeUpVariants}
            onClick={() => setIsAdding(true)}
            className="block mx-auto mt-8 bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg flex items-center gap-2 justify-center"
          >
            <Plus className="w-5 h-5" />
            Add Note
          </motion.button>
        )}

        {/* Empty State */}
        {notes.length === 0 && !isAdding && (
          <motion.div variants={fadeUpVariants} className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes yet. Start adding your love messages!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
