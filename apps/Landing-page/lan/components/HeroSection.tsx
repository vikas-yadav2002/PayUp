'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from './ui/Button'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Digital payment background"
         fill={true}
         style={{ objectFit: 'cover' }}
          className="opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Let's Do It!
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Seamless payments made easy
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
