'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainerVariants, floatingVariants } from '@/lib/animations'
import { BirthdayData } from '@/lib/types'

interface HeroProps {
  data: BirthdayData
  onScrollClick: () => void
}

export function Hero({ data, onScrollClick }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 overflow-hidden flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div variants={fadeUpVariants}>
          <h1 className="text-5xl md:text-7xl font-bold font-dancing text-pink-600 mb-4 drop-shadow-lg">
            {data.recipientName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUpVariants}>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="mb-8">
          <div className="flex justify-center gap-4 flex-wrap">
            {['🎉', '🎁', '🎈', '🎊'].map((emoji, i) => (
              <motion.span
                key={i}
                variants={floatingVariants}
                animate="animate"
                className="text-4xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.button
          variants={fadeUpVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollClick}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-shadow shadow-lg"
        >
          Open Surprise 🎁
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-3xl">⬇️</div>
      </motion.div>
    </section>
  )
}
