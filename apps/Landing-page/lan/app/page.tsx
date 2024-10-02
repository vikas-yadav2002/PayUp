'use client'

import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import AnimatedIcons from '@/components/AnimatedIcons'
import Testimonials from '@/components/Testimonials'
import Features from '@/components/Features'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <HeroSection />
      <AnimatedIcons />
      <Testimonials />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default LandingPage
