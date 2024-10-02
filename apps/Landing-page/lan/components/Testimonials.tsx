'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonialsData = [
  {
    text: "PayEase transformed how I handle transactions!",
    author: "John D.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
  },
  {
    text: "The fastest and most secure payment app I've ever used.",
    author: "Sarah M.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
  },
  {
    text: "Incredibly user-friendly. Highly recommended!",
    author: "Alex K.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
  },
]

const Testimonials = () => {
  return (
    <motion.div
      className="bg-gray-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-8">What Our Users Say</h3>
        <div className="flex overflow-x-hidden">
          <motion.div
            className="flex"
            animate={{ x: [0, -100 * testimonialsData.length + 100] }}
            transition={{
              x: { duration: 20, repeat: Infinity, repeatType: "loop" },
              ease: "linear",
            }}
          >
            {testimonialsData.concat(testimonialsData).map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 flex-shrink-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Image src={testimonial.image} alt={testimonial.author} width={50} height={50} className="rounded-full mr-4" />
                    <p className="text-primary font-semibold">{testimonial.author}</p>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Testimonials
