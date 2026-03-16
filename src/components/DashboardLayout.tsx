'use client'

import { useState } from 'react'
import { BarChart3, MessageSquare, Settings, Menu, X, Upload, Bot } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LogoutButton from './LogoutButton'
import AppSidebar from './AppSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  onLogout: () => void
  isDarkTheme: boolean
  toggleTheme: () => void
}

export default function DashboardLayout({ children, onLogout, isDarkTheme, toggleTheme }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeChatId, setActiveChatId] = useState<string | undefined>()

  const borderColor = isDarkTheme ? 'border-purple-400/30' : 'border-gray-300'

  return (
    <div className={`min-h-screen w-screen h-screen fixed inset-0 overflow-hidden ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
      {/* Animated background */}
      <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'}`}>
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-black/30' : 'bg-white/60'}`} />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className={`absolute top-0 left-0 w-full h-full ${isDarkTheme ? 'bg-gradient-to-r from-purple-600/10 to-transparent' : 'bg-gradient-to-r from-purple-200/20 to-transparent'}`}>
              <div className="grid grid-cols-12 grid-rows-12 h-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className={`border ${isDarkTheme ? 'border-purple-400/20' : 'border-purple-300/20'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
          <div className={`absolute top-10 left-10 w-32 h-32 ${isDarkTheme ? 'bg-purple-600/20' : 'bg-purple-100/30'} rounded-full blur-2xl animate-bounce`} />
          <div className={`absolute bottom-20 right-20 w-40 h-40 ${isDarkTheme ? 'bg-indigo-600/20' : 'bg-indigo-100/30'} rounded-full blur-2xl animate-bounce delay-1000`} />
          <div className={`absolute top-1/3 right-1/4 w-36 h-36 ${isDarkTheme ? 'bg-blue-600/20' : 'bg-blue-100/30'} rounded-full blur-2xl animate-bounce delay-2000`} />
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── LEFT SIDEBAR (Chat History — from SoulSync AppSidebar) ─── */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 backdrop-blur-3xl
        ${isDarkTheme ? 'bg-purple-950/30' : 'bg-white/95'}
        border-r ${borderColor} shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col
      `}>
        {/* Sidebar header */}
        <div className={`flex items-center justify-between h-16 px-6 border-b ${borderColor} backdrop-blur-xl flex-shrink-0`}>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl mr-3 flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>SmartDash AI</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className={`w-5 h-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Chat history sidebar from SoulSync */}
        <div className="flex-1 overflow-hidden">
          <AppSidebar
            isDarkTheme={isDarkTheme}
            activeChatId={activeChatId}
            onSelectChat={(id) => {
              setActiveChatId(id)
              setSidebarOpen(false)
            }}
          />
        </div>

        {/* Bottom: logout + theme */}
        <div className={`p-4 border-t ${borderColor} backdrop-blur-xl flex-shrink-0`}>
          <LogoutButton onLogout={onLogout} isDarkTheme={isDarkTheme} variant="sidebar" size="md" showConfirmation={true} />
          <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} size="md" variant="switch" />
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="lg:ml-64 relative z-10 h-full overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className={`backdrop-blur-3xl ${isDarkTheme ? 'bg-purple-950/30' : 'bg-white/95'} border-b ${borderColor} shadow-lg flex-shrink-0`}>
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Menu className={`w-5 h-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            <div className="flex-1 lg:flex-none">
              <h1 className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>New AI chat</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} size="md" variant="button" /> */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20">
          {children}
        </main>

        {/* Footer */}
        <footer className={`relative backdrop-blur-3xl ${isDarkTheme ? 'bg-gradient-to-r from-purple-950/20 via-purple-900/20 to-purple-950/20' : 'bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95'} border-t ${borderColor} py-6 px-6 flex-shrink-0`}>
          <div className="relative z-10 text-center">
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
              © {new Date().getFullYear()} Quibits. All rights reserved.
            </p>
            <div className={`mt-2 flex items-center justify-center space-x-4 text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
              <span>Privacy Policy</span>
              <span className={isDarkTheme ? 'text-gray-600' : 'text-gray-400'}>•</span>
              <span>Terms of Service</span>
              <span className={isDarkTheme ? 'text-gray-600' : 'text-gray-400'}>•</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
