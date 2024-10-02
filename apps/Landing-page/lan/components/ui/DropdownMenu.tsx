'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DropdownMenuProps {
  children: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>
}

export const DropdownMenuTrigger: React.FC<{ asChild?: boolean; children: React.ReactElement }> = ({ asChild = false, children }) => {
  if (asChild) {
    return React.cloneElement(children, { className: 'cursor-pointer' })
  }
  return <button className="cursor-pointer">{children}</button>
}

export const DropdownMenuContent: React.FC<{ className?: string; align?: string; forceMount?: boolean; children: React.ReactNode }> = ({ className, align, forceMount, children }) => {
  return (
    <motion.div
      className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export const DropdownMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      {children}
    </button>
  )
}

export const DropdownMenuLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-2 text-sm text-gray-500">{children}</div>
}

export const DropdownMenuSeparator: React.FC = () => {
  return <div className="border-t border-gray-200 my-1"></div>
}
