'use client'

import { motion } from 'framer-motion'
import { CreditCard, Wallet } from 'lucide-react'

const AnimatedIcons = () => {
  return (
    <div className="flex justify-center space-x-12 my-12">
      {[CreditCard, Wallet].map((Icon, index) => (
        <motion.div
          key={index}
          className="text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon size={48} />
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedIcons
