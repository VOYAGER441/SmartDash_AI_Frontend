'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface CustomScrollButtonProps {
  isDarkTheme: boolean
  direction?: 'up' | 'down'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  showThreshold?: number
}

export default function CustomScrollButton({ 
  isDarkTheme, 
  direction = 'up',
  position = 'bottom-right',
  showThreshold = 200 
}: CustomScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (direction === 'up') {
        setIsVisible(scrollY > showThreshold)
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setIsVisible(scrollY < maxScroll - showThreshold)
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
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: maxScroll, behavior: 'smooth' })
    }
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  if (!isVisible && direction === 'up') return null

  return (
    <button
      onClick={scrollTo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses[position]} group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-indigo-700' 
          : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-400/50 hover:from-cyan-600 hover:to-blue-700'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{ width: '36px', height: '36px' }}
    >
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
        isDarkTheme 
          ? 'from-purple-500/20 via-indigo-500/20 to-blue-500/20' 
          : 'from-cyan-500/20 via-blue-500/20 to-purple-500/20'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative flex items-center justify-center">
        <div className={`transition-all duration-500 transform ${
          direction === 'up' ? 'group-hover:-translate-y-1' : 'group-hover:translate-y-1'
        }`}>
          {direction === 'up' ? (
            <ChevronUp className={`w-4 h-4 ${isDarkTheme ? 'text-white' : 'text-white'}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${isDarkTheme ? 'text-white' : 'text-white'}`} />
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
