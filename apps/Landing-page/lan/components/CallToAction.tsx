'use client'

import Button from './ui/Button'

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your payments?</h2>
        <p className="text-xl mb-8">Join thousands of satisfied users and experience the future of digital transactions.</p>
        <Button size="lg" variant="secondary">
          Sign Up Now
        </Button>
      </div>
    </section>
  )
}

export default CallToAction
