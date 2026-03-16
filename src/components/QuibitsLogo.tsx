'use client'

import { useState } from 'react'
import { Brain, Sparkles, Zap } from 'lucide-react'

interface QuibitsLogoProps {
  isDarkTheme: boolean
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  onClick?: () => void
}

export default function QuibitsLogo({ 
  isDarkTheme, 
  size = 'md', 
  showText = true,
  onClick 
}: QuibitsLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Logo Container */}
      <div className={`relative ${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group`}>
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Logo Letter */}
        <span className={`relative z-10 font-bold text-white ${sizeClasses[size].split(' ')[2]}`}>
          Q
        </span>
        
        {/* Animated Icons */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-1 left-1">
            <Sparkles className={`${iconSizes[size]} text-white/80 animate-pulse`} />
          </div>
          <div className="absolute bottom-1 right-1">
            <Zap className={`${iconSizes[size]} text-white/80 animate-pulse delay-100`} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Brain className={`${iconSizes[size]} text-white/60 animate-pulse delay-200`} />
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isHovered 
            ? 'shadow-lg shadow-purple-500/50 ring-2 ring-purple-400/30' 
            : ''
        }`}></div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold transition-colors duration-300 ${
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
          } ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Quibits
          </span>
          <span className={`text-xs transition-colors duration-300 ${
            isDarkTheme ? 'text-purple-400' : 'text-purple-600'
          }`}>
            AI Intelligence
          </span>
        </div>
      )}
    </button>
  )
}
