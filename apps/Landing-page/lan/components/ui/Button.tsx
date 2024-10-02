'use client'

import React from 'react'
import { cn } from '@/lib/utils' // Utility function for conditional class names

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary-dark',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  }

  return (
    <button
      className={cn(
        'rounded-md border border-transparent font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
