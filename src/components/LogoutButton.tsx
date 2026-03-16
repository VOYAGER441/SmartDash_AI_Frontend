'use client'

import { useState } from 'react'
import { LogOut, Shield, Lock } from 'lucide-react'

interface LogoutButtonProps {
  onLogout: () => void
  isDarkTheme: boolean
  variant?: 'sidebar' | 'topbar' | 'floating' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showConfirmation?: boolean
}

export default function LogoutButton({ 
  onLogout, 
  isDarkTheme, 
  variant = 'sidebar', 
  size = 'md',
  showConfirmation = false 
}: LogoutButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleLogout = () => {
    if (showConfirmation && !isConfirming) {
      setIsConfirming(true)
      setTimeout(() => setIsConfirming(false), 3000)
      return
    }
    onLogout()
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-24 right-6 group flex items-center px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-indigo-700' 
            : 'bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-400/50 hover:from-red-600 hover:to-pink-700'
        } ${isConfirming ? 'animate-pulse' : ''}`}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
          isDarkTheme 
            ? 'from-purple-500/20 via-indigo-500/20 to-blue-500/20' 
            : 'from-red-500/20 via-pink-500/20 to-orange-500/20'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        <div className="relative flex items-center space-x-2">
          <div className={`transition-all duration-500 transform ${
            isConfirming ? 'rotate-180' : 'group-hover:rotate-12'
          }`}>
            <LogOut className={`w-4 h-4 ${isDarkTheme ? 'text-white' : 'text-white'}`} />
          </div>
          
          {isConfirming && (
            <div className="flex items-center space-x-1">
              <Lock className={`w-3 h-3 ${isDarkTheme ? 'text-purple-300' : 'text-red-200'} animate-pulse`} />
              <span className={`text-xs font-medium ${isDarkTheme ? 'text-purple-200' : 'text-red-100'}`}>
                Confirm?
              </span>
            </div>
          )}
        </div>

        {/* Tooltip */}
        {!isConfirming && (
          <div className={`absolute bottom-full mb-2 right-0 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDarkTheme ? 'bg-purple-900 text-purple-300' : 'bg-gray-800 text-red-300'
          }`}>
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3" />
              <span>Logout</span>
            </div>
            <div className={`absolute top-full left-0 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent ${
              isDarkTheme ? 'border-t-purple-900' : 'border-t-gray-800'
            }`}></div>
          </div>
        )}
      </button>
    )
  }

  if (variant === 'danger') {
    return (
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group flex items-center justify-center ${sizeClasses[size]} rounded-xl transition-all duration-300 transform hover:scale-105 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-500/50' 
            : 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-400/50'
        } ${isConfirming ? 'animate-pulse' : ''}`}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative flex items-center">
          <div className={`rounded-full flex items-center justify-center mr-2 transition-all duration-500 transform group-hover:rotate-12 ${
            isDarkTheme 
              ? 'bg-white/20' 
              : 'bg-white/30'
          }`}>
            {isConfirming ? (
              <Lock className={`${iconSizes[size]} text-white`} />
            ) : (
              <LogOut className={`${iconSizes[size]} text-white`} />
            )}
          </div>
          
          <span className="font-medium">
            {isConfirming ? 'Confirm Logout' : 'Logout'}
          </span>
        </div>

        {/* Warning particles */}
        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-1/2 right-2 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </button>
    )
  }

  if (variant === 'topbar') {
    return (
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group p-2 rounded-lg transition-all duration-300 ${
          isDarkTheme 
            ? 'hover:bg-purple-500/20 text-purple-400' 
            : 'hover:bg-red-50 text-red-600'
        } hover:shadow-lg`}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
              : 'bg-gradient-to-br from-red-600 to-orange-600'
          } shadow-lg`}>
            <LogOut className="w-3 h-3 text-white" />
          </div>
          
          {/* Security indicator */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
            isDarkTheme ? 'bg-purple-400' : 'bg-red-600'
          }`}></div>
        </div>

        {/* Tooltip */}
        <div className={`absolute bottom-full mb-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDarkTheme ? 'bg-purple-900 text-white' : 'bg-gray-800 text-white'
        }`}>
          {isConfirming ? 'Click to confirm' : 'Logout'}
        </div>
      </button>
    )
  }

  // Default sidebar variant
  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group flex items-center w-full ${sizeClasses[size]} rounded-xl transition-all duration-300 border hover:shadow-lg transform hover:scale-105 ${
        isDarkTheme 
          ? 'text-gray-300 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-400/30' 
          : 'text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300'
      } border-transparent mb-2`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
            : 'bg-gradient-to-br from-red-600 to-orange-600'
        } shadow-lg`}>
          <LogOut className="w-4 h-4 text-white" />
        </div>
        
        <div className="flex-1">
          <span className="font-medium">Logout</span>
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
              isDarkTheme ? 'bg-purple-400' : 'bg-red-600'
            }`}></div>
            <span className={`text-xs ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {isConfirming ? 'Click again to confirm' : (isDarkTheme ? 'Sign out securely' : 'Sign out of your account')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Animated logout particles */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    </button>
  )
}
