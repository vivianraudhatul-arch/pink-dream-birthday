'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const SakuraPetal = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100
  const randomDuration = 4 + Math.random() * 3
  const randomRotation = Math.random() * 360

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, x: randomX }}
      animate={{
        opacity: [1, 1, 0],
        y: '100vh',
        rotate: randomRotation + 360,
      }}
      transition={{
        duration: randomDuration,
        delay,
        repeat: Infinity,
      }}
      className="fixed pointer-events-none text-pink-400"
    >
      <span className="text-3xl">🌸</span>
    </motion.div>
  )
}

export function SakuraEffect() {
  const petals = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {petals.map((i) => (
        <SakuraPetal key={i} delay={i * 0.5} />
      ))}
    </div>
  )
}
