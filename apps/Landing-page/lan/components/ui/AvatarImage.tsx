'use client'

import React from 'react'
import Image from 'next/image'

interface AvatarImageProps {
  src: string
  alt: string
}

const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} fill={true} style={{ objectFit: 'cover' }} />
}

export default AvatarImage
