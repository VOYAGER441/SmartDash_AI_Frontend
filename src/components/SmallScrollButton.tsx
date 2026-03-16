'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface SmallScrollButtonProps {
  isDarkTheme: boolean
  direction?: 'up' | 'down'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center-right' | 'center-left'
  showThreshold?: number
}

export default function SmallScrollButton({ 
  isDarkTheme, 
  direction = 'up', 
  position = 'bottom-right',
  showThreshold = 200 
}: SmallScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      
      if (direction === 'up') {
        setIsVisible(scrollY > showThreshold)
      } else {
        setIsVisible(documentHeight - (scrollY + windowHeight) > showThreshold)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [direction, showThreshold])

  const scrollTo = () => {
    if (direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
    'center-right': 'top-1/2 right-8 -translate-y-1/2',
    'center-left': 'top-1/2 left-8 -translate-y-1/2'
  }

  if (!isVisible && direction === 'up') return null

  return (
    <button
      onClick={scrollTo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses[position]} group p-2 rounded-full transition-all duration-300 transform hover:scale-110 z-40 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-purple-500/80 to-indigo-600/80 shadow-lg shadow-purple-500/30 hover:from-purple-600 hover:to-indigo-700' 
          : 'bg-gradient-to-br from-cyan-500/80 to-blue-600/80 shadow-lg shadow-cyan-400/30 hover:from-cyan-600 hover:to-blue-700'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {/* Inner glow effect */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } ${isDarkTheme ? 'bg-purple-400/30' : 'bg-cyan-400/30'}`}></div>
      
      {/* Arrow icon */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        {direction === 'up' ? (
          <ChevronUp className="w-3 h-3 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
        ) : (
          <ChevronDown className="w-3 h-3 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
        )}
      </div>

      {/* Mini tooltip */}
      <div className={`absolute ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDarkTheme ? 'bg-gray-800 text-purple-300' : 'bg-gray-800 text-cyan-300'
      }`}>
        {direction === 'up' ? 'Top ↑' : 'Bottom ↓'}
      </div>
    </button>
  )
}
