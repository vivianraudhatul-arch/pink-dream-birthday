'use client'

import { motion } from 'framer-motion'
import { X, Edit2 } from 'lucide-react'
import { useState } from 'react'
import { fadeUpVariants } from '@/lib/animations'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { BirthdayData } from '@/lib/types'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  data: BirthdayData
}

export function AdminPanel({ isOpen, onClose, data }: AdminPanelProps) {
  const [birthdayData, setBirthdayData, isLoading] = useLocalStorage<BirthdayData>(
    'birthdayData',
    data
  )
  const [formData, setFormData] = useState({
    recipientName: birthdayData.recipientName,
    subtitle: birthdayData.subtitle,
  })

  const handleSave = () => {
    setBirthdayData((prev) => ({
      ...prev,
      recipientName: formData.recipientName,
      subtitle: formData.subtitle,
    }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-dancing text-pink-600 flex items-center gap-2">
            <Edit2 className="w-6 h-6" />
            Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Birthday Person Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Birthday Person Name
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                setFormData({ ...formData, recipientName: e.target.value })
              }
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitle
            </label>
            <textarea
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> Use other sections to add photos, timeline entries,
              messages, notes, and gift boxes. This panel is for quick edits to the main
              header.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div className="bg-pink-50 rounded-lg p-3">
              <p className="font-semibold text-pink-600">{birthdayData.photos.length}</p>
              <p className="text-gray-600 text-xs">Photos</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-semibold text-blue-600">
                {birthdayData.timeline.length}
              </p>
              <p className="text-gray-600 text-xs">Timeline Entries</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="font-semibold text-purple-600">
                {birthdayData.messages.length}
              </p>
              <p className="text-gray-600 text-xs">Messages</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="font-semibold text-yellow-600">{birthdayData.notes.length}</p>
              <p className="text-gray-600 text-xs">Notes</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                handleSave()
                onClose()
              }}
              className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
