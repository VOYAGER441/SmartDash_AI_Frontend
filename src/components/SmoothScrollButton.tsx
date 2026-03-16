'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ArrowDown } from 'lucide-react'

interface SmoothScrollButtonProps {
  isDarkTheme: boolean
  direction?: 'up' | 'down'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  showThreshold?: number
}

export default function SmoothScrollButton({ 
  isDarkTheme, 
  direction = 'up', 
  position = 'bottom-right',
  showThreshold = 200 
}: SmoothScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8'
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    setIsVisible(scrollY > showThreshold)
  }

  const scrollTo = () => {
    const targetY = direction === 'up' ? 0 : document.documentElement.scrollHeight
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showThreshold])

  if (!isVisible && direction === 'up') return null

  return (
    <button
      onClick={scrollTo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses[position]} group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 hover:from-purple-600 hover:to-indigo-700' 
          : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-400/50 hover:from-cyan-600 hover:to-blue-700'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 transform ${
          direction === 'up' ? 'group-hover:-translate-y-1' : 'group-hover:translate-y-1'
        }`}>
          {direction === 'up' ? (
            <ChevronUp className="w-3 h-3 text-white" />
          ) : (
            <ArrowDown className="w-3 h-3 text-white" />
          )}
        </div>
        
        {/* Animated ring */}
        <div className={`absolute inset-0 rounded-full animate-ping ${
          isDarkTheme ? 'bg-purple-400/30' : 'bg-cyan-400/30'
        }`}></div>
      </div>

      {/* Tooltip */}
      <div className={`absolute ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDarkTheme ? 'bg-gray-800 text-purple-300' : 'bg-gray-800 text-cyan-300'
      }`}>
        {direction === 'up' ? 'Scroll to top ↑' : 'Scroll to bottom ↓'}
      </div>
    </button>
  )
}
