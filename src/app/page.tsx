'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2 } from 'lucide-react'
import { Hero } from '@/components/Hero'
import { Gallery } from '@/components/Gallery'
import { Timeline } from '@/components/Timeline'
import { Messages } from '@/components/Messages'
import { NotesWall } from '@/components/NotesWall'
import { MusicPlayer } from '@/components/MusicPlayer'
import { GiftBoxes } from '@/components/GiftBoxes'
import { Slideshow } from '@/components/Slideshow'
import { ThemeCustomizer } from '@/components/ThemeCustomizer'
import { AdminPanel } from '@/components/AdminPanel'
import { FloatingHearts } from '@/components/FloatingHearts'
import { SakuraEffect } from '@/components/SakuraEffect'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { BirthdayData } from '@/lib/types'
import { DUMMY_DATA, DEFAULT_THEME } from '@/lib/constants'

export default function Home() {
  const [data, setData, isLoading] = useLocalStorage<BirthdayData>(
    'birthdayData',
    {
      ...DUMMY_DATA,
      theme: DEFAULT_THEME,
    }
  )
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  const handleScrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🎂
        </motion.div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${data.theme.backgroundColor}, white)`,
        fontFamily: data.theme.fontStyle === 'dancing' ? 'Dancing Script' : 'Poppins',
      }}
    >
      {/* Background Effects */}
      <FloatingHearts />
      <SakuraEffect />

      {/* Admin Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-30 flex items-center gap-2 px-4"
      >
        <Edit2 className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">Edit</span>
      </motion.button>

      {/* Main Content */}
      <Hero data={data} onScrollClick={handleScrollToGallery} />

      <div ref={galleryRef}>
        <Gallery data={data} />
      </div>

      <Timeline data={data} />

      <Messages data={data} />

      <NotesWall data={data} />

      <MusicPlayer data={data} />

      <GiftBoxes data={data} />

      <Slideshow data={data} />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12 text-center"
      >
        <p className="text-lg font-dancing mb-2">Made with 💗 for {data.recipientName}</p>
        <p className="text-sm opacity-90">Pink Dream Birthday © 2024</p>
      </motion.footer>

      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            data={data}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
