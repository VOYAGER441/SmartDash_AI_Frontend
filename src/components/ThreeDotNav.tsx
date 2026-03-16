'use client'

import { useState } from 'react'
import { MoreVertical, LogOut, User, Settings, HelpCircle, Moon, Sun } from 'lucide-react'

interface ThreeDotNavProps {
  onLogout: () => void
  isDarkTheme: boolean
  toggleTheme: () => void
  username?: string
}

export default function ThreeDotNav({ 
  onLogout, 
  isDarkTheme, 
  toggleTheme, 
  username = 'User' 
}: ThreeDotNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleLogout = () => {
    setShowConfirmDialog(false)
    setIsOpen(false)
    onLogout()
  }

  return (
    <>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
        {/* 3-dot button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-400/40 hover:border-purple-400/60' 
              : 'bg-gradient-to-br from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200 border border-cyan-300 hover:border-cyan-400'
          }`}
        >
          <MoreVertical className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          } ${isDarkTheme ? 'text-purple-400' : 'text-cyan-600'}`} />
        </button>

        {/* Navigation dots indicator */}
        <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 flex flex-col space-y-1 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } transition-all duration-300`}>
          <div className={`w-2 h-2 rounded-full ${isDarkTheme ? 'bg-purple-400' : 'bg-cyan-500'}`}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkTheme ? 'bg-purple-400' : 'bg-cyan-500'}`}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkTheme ? 'bg-purple-400' : 'bg-cyan-500'}`}></div>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu content */}
            <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 rounded-2xl shadow-2xl border z-20 overflow-hidden ${
              isDarkTheme 
                ? 'bg-slate-900/95 border-purple-400/40 backdrop-blur-xl' 
                : 'bg-white/95 border-gray-300 backdrop-blur-xl'
            }`}>
              {/* User info */}
              <div className={`px-4 py-3 border-b ${isDarkTheme ? 'border-purple-400/20' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkTheme ? 'bg-purple-500/30' : 'bg-cyan-500/30'
                  }`}>
                    <User className={`w-5 h-5 ${isDarkTheme ? 'text-purple-400' : 'text-cyan-600'}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                      {username}
                    </p>
                    <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <button
                  onClick={toggleTheme}
                  className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                    isDarkTheme 
                      ? 'text-gray-300 hover:bg-purple-500/20 hover:text-white' 
                      : 'text-gray-700 hover:bg-cyan-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isDarkTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span className="text-sm">{isDarkTheme ? 'Dark Mode' : 'Light Mode'}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full transition-colors ${
                    isDarkTheme ? 'bg-purple-600' : 'bg-cyan-500'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      isDarkTheme ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                </button>
                
                <button className={`w-full px-4 py-3 flex items-center space-x-3 text-sm transition-colors ${
                  isDarkTheme 
                    ? 'text-gray-300 hover:bg-purple-500/20 hover:text-white' 
                    : 'text-gray-700 hover:bg-cyan-100 hover:text-gray-900'
                }`}>
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                <button className={`w-full px-4 py-3 flex items-center space-x-3 text-sm transition-colors ${
                  isDarkTheme 
                    ? 'text-gray-300 hover:bg-purple-500/20 hover:text-white' 
                    : 'text-gray-700 hover:bg-cyan-100 hover:text-gray-900'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Logout button */}
              <div className={`px-2 py-2 border-t ${isDarkTheme ? 'border-purple-400/20' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  className={`w-full px-3 py-3 flex items-center justify-center space-x-2 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isDarkTheme 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-red-500/25' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-400/25'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation dialog */}
      {showConfirmDialog && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowConfirmDialog(false)}
          >
            {/* Dialog content */}
            <div 
              className={`mx-4 max-w-sm w-full rounded-2xl shadow-2xl border p-6 ${
                isDarkTheme 
                  ? 'bg-slate-900/95 border-purple-400/40 backdrop-blur-xl' 
                  : 'bg-white/95 border-gray-300 backdrop-blur-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkTheme ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                  <LogOut className={`w-6 h-6 ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                
                {/* Title */}
                <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Logout
                </h3>
                
                {/* Message */}
                <p className={`text-sm mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                  Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>
                
                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDarkTheme 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      isDarkTheme 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg' 
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
