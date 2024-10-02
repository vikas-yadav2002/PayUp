'use client'

import React from 'react'

interface AvatarFallbackProps {
  children: React.ReactNode
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return <span className="text-sm font-medium text-gray-700">{children}</span>
}

export default AvatarFallback
