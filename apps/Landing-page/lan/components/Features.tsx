'use client'

import { motion } from 'framer-motion'
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card'
import { Zap, Lock, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process payments in seconds, not minutes. Speed is our middle name.",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Your money and data are protected by state-of-the-art encryption and security protocols.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send and receive money from anywhere in the world, with competitive exchange rates.",
  },
]

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose PayEase?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
