'use client'

import { motion } from 'framer-motion'
import { Palette, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { COLOR_PALETTE } from '@/lib/constants'

export function ThemeCustomizer() {
  const { theme, updateTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors z-40"
        aria-label="Open theme customizer"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Customizer Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-8 bg-white rounded-lg shadow-2xl p-6 w-80 z-40 border-2 border-pink-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-pink-600">Theme Customizer</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Color */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Primary Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color}
                  onClick={() => updateTheme({ primaryColor: color })}
                  className={`h-12 rounded-lg border-4 transition-all ${
                    theme.primaryColor === color
                      ? 'border-gray-800 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Background Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color}
                  onClick={() => updateTheme({ backgroundColor: color })}
                  className={`h-12 rounded-lg border-4 transition-all ${
                    theme.backgroundColor === color
                      ? 'border-gray-800 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Background ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Font Style */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Font Style
            </label>
            <div className="flex gap-2">
              {(['poppins', 'dancing'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => updateTheme({ fontStyle: font })}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all text-sm ${
                    theme.fontStyle === font
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={{
                    fontFamily: font === 'poppins' ? 'Poppins' : 'Dancing Script',
                  }}
                >
                  {font.charAt(0).toUpperCase() + font.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Speed */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Animation Speed
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={theme.animationSpeed}
                onChange={(e) =>
                  updateTheme({ animationSpeed: parseFloat(e.target.value) })
                }
                className="flex-1 h-2 bg-pink-300 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-700 min-w-12">
                {theme.animationSpeed.toFixed(1)}x
              </span>
            </div>
          </div>

          {/* Current Theme Preview */}
          <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Preview</p>
            <div
              className="p-3 rounded text-center text-white font-bold"
              style={{
                backgroundColor: theme.primaryColor,
                fontFamily: theme.fontStyle === 'poppins' ? 'Poppins' : 'Dancing Script',
              }}
            >
              Theme Preview
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
