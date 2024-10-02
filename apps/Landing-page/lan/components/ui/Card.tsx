'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn('bg-white rounded-lg shadow-md', className)}>{children}</div>
}

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>
}

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-6 py-4">{children}</div>
}

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-gray-600">{children}</p>
}

export default Card
