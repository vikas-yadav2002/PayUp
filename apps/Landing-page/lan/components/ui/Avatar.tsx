'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className, children, ...props }) => {
  return (
    <div className={cn('relative inline-flex items-center justify-center overflow-hidden rounded-full', className)} {...props}>
      {src ? (
        <Image src={src} alt={"alt"} fill={true}  style={{ objectFit: 'cover' }} />
      ) : (
        <span className="text-sm font-medium text-gray-700">{fallback}</span>
      )}
      {children}
    </div>
  )
}

export default Avatar
