'use client'

import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  isDarkTheme: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'button' | 'switch' | 'floating'
}

export default function ThemeToggle({ isDarkTheme, onToggle, size = 'md', variant = 'button' }: ThemeToggleProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative inline-flex items-center justify-center p-1 rounded-full transition-all duration-300 ${isDarkTheme
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50'
          : 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
          }`}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>

        {/* Switch track */}
        <div className={`relative w-16 h-8 rounded-full ${isDarkTheme ? 'bg-purple-900/50' : 'bg-gray-200'} border ${isDarkTheme ? 'border-purple-400/30' : 'border-gray-300'}`}>
          {/* Switch thumb */}
          <div
            className={`absolute top-1 ${isDarkTheme ? 'left-8' : 'left-1'} w-6 h-6 rounded-full transition-all duration-500 transform hover:scale-110`}
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center shadow-lg ${isDarkTheme
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
              : 'bg-gradient-to-br from-blue-600 to-purple-600'
              }`}>
              {isDarkTheme ? (
                <Sun className={`${iconSizes.sm} text-white`} />
              ) : (
                <Moon className={`${iconSizes.sm} text-white`} />
              )}
            </div>
            {/* Animated glow effect */}
            <div className={`absolute inset-0 rounded-full animate-ping ${isDarkTheme ? 'bg-yellow-400/50' : 'bg-blue-600/50'
              }`}></div>
          </div>
        </div>

        {/* Labels */}
        <div className="ml-4 text-sm">
          <span className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {isDarkTheme ? 'Dark' : 'Light'}
          </span>
          <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            {isDarkTheme ? '🌙 Night mode' : '☀️ Day mode'}
          </div>
        </div>
      </button>
    )
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-8 right-8 group p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${isDarkTheme
          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl shadow-purple-500/50'
          : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-2xl shadow-blue-500/50'
          }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative">
          <div className={`${sizeClasses.lg} rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:rotate-180`}>
            {isDarkTheme ? (
              <Sun className={`${iconSizes.lg} text-white`} />
            ) : (
              <Moon className={`${iconSizes.lg} text-white`} />
            )}
          </div>

          {/* Orbiting particles */}
          <div className="absolute inset-0">
            <div className={`absolute top-0 left-1/2 w-2 h-2 rounded-full animate-spin ${isDarkTheme ? 'bg-yellow-400' : 'bg-blue-400'
              }`} style={{ animationDuration: '3s' }}></div>
            <div className={`absolute bottom-0 left-1/2 w-2 h-2 rounded-full animate-spin ${isDarkTheme ? 'bg-orange-400' : 'bg-purple-400'
              }`} style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full animate-spin ${isDarkTheme ? 'bg-yellow-300' : 'bg-indigo-400'
              }`} style={{ animationDuration: '4s' }}></div>
          </div>
        </div>

        {/* Tooltip */}
        <div className={`absolute bottom-full mb-2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'
          }`}>
          {isDarkTheme ? 'Switch to light mode ☀️' : 'Switch to dark mode 🌙'}
        </div>
      </button>
    )
  }

  // Default button variant
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group p-3 rounded-xl transition-all duration-300 ${isDarkTheme
        ? 'hover:bg-purple-500/20'
        : 'hover:bg-gray-200'
        } hover:shadow-lg`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:rotate-180 group-hover:scale-110 ${isDarkTheme
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
          : 'bg-gradient-to-br from-blue-600 to-purple-600'
          } shadow-lg`}>
          {isDarkTheme ? (
            <Sun className={`${iconSizes[size]} text-white`} />
          ) : (
            <Moon className={`${iconSizes[size]} text-white`} />
          )}
        </div>

        {/* Animated glow ring */}
        <div className={`absolute inset-0 rounded-full animate-ping ${isDarkTheme ? 'bg-yellow-400/30' : 'bg-blue-600/30'
          }`}></div>

        {/* Pulsing dot */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${isDarkTheme ? 'bg-yellow-400' : 'bg-blue-600'
          }`}></div>
      </div>
    </button>
  )
}
