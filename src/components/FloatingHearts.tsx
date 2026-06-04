'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Heart = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100
  const randomDuration = 3 + Math.random() * 2

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, x: randomX }}
      animate={{ opacity: [1, 1, 0], y: '100vh' }}
      transition={{
        duration: randomDuration,
        delay,
        repeat: Infinity,
      }}
      className="fixed pointer-events-none text-pink-500"
    >
      <span className="text-2xl">❤️</span>
    </motion.div>
  )
}

export function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((i) => (
        <Heart key={i} delay={i * 0.3} />
      ))}
    </div>
  )
}
