'use client'

import { useState } from 'react'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import DashboardLayout from '@/components/DashboardLayout'
import Dashboard from '@/components/Dashboard'
import ChatInterface from '@/components/ChatInterface'
import ChatDetails from '@/components/ChatDetails'
import CSVUpload from '@/components/CSVUpload'
import ThemeToggle from '@/components/ThemeToggle'
import LogoutButton from '@/components/LogoutButton'
import CustomScrollbar from '@/components/CustomScrollbar'
import ThreeDotNav from '@/components/ThreeDotNav'
import CustomScrollButton from '@/components/CustomScrollButton'
import QuibitsLogo from '@/components/QuibitsLogo'

interface ChartData {
  id: string
  type: 'line' | 'bar' | 'pie' | 'area'
  title: string
  data: any[]
  xKey: string
  yKey: string
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [showSignup, setShowSignup] = useState(false)
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'upload'>('chat')
  const [chatCharts, setChatCharts] = useState<ChartData[]>([])
  const [showChatDetails, setShowChatDetails] = useState(false)

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password })
    setIsAuthenticated(true)
  }

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup attempt:', { name, email, password })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('chat')
    setShowSignup(false)
    setChatCharts([])
    setShowChatDetails(false)
  }

  const handleCSVUpload = (file: File) => {
    console.log('CSV file uploaded:', file.name)
    alert(`CSV file "${file.name}" uploaded successfully!`)
  }

  const handleChartsGenerated = (charts: ChartData[]) => {
    setChatCharts(charts)
    setCurrentView('dashboard')
  }

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  if (!isAuthenticated) {
    return showSignup ? (
      <Signup onSignup={handleSignup} onBackToLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />
    )
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-white'} relative`}>
      {/* Header logo */}
      <div className="fixed top-4 left-4 z-40">
        <QuibitsLogo
          isDarkTheme={isDarkTheme}
          size="lg"
          showText={true}
          onClick={() => console.log('Logo clicked')}
        />
      </div>

      {/* Three-dot nav */}
      <ThreeDotNav
        onLogout={handleLogout}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        username="Admin User"
      />

      {/* Scroll button */}
      <CustomScrollButton
        isDarkTheme={isDarkTheme}
        direction="up"
        position="bottom-right"
        showThreshold={200}
      />

      <DashboardLayout
        onLogout={handleLogout}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      >
        <div className="space-y-6">
          {/* View Toggle */}
          <div className={`backdrop-blur-2xl ${isDarkTheme ? 'bg-gray-950/60' : 'bg-white/90'} rounded-lg border ${isDarkTheme ? 'border-pink-500/40' : 'border-gray-300'} p-1 inline-flex`}>
            {(['chat', 'dashboard'] as const).map(view => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                  currentView === view
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : isDarkTheme
                    ? 'text-gray-400 hover:text-white hover:bg-pink-500/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {view === 'chat' ? 'Chat Interface' : 'Dashboard View'}
              </button>
            ))}
          </div>

          {/* Dashboard */}
          {currentView === 'dashboard' && (
            <Dashboard
              isDarkTheme={isDarkTheme}
              charts={chatCharts}
              onLogout={handleLogout}
            />
          )}

          {/* Chat + Details panel (from SoulSync) */}
          {currentView === 'chat' && (
            <div className="flex gap-6">
              {/* Main chat */}
              <div className="flex-1 min-w-0">
                <ChatInterface
                  isDarkTheme={isDarkTheme}
                  onChartsGenerated={handleChartsGenerated}
                />
              </div>

              {/* Chat Details panel — converted from SoulSync chat-details */}
              <div className="w-80 flex-shrink-0 hidden xl:block">
                <ChatDetails
                  isDarkTheme={isDarkTheme}
                  chatTitle="Current Session"
                  messageCount={chatCharts.length > 0 ? 6 : 1}
                  duration={chatCharts.length > 0 ? '4 min' : '< 1 min'}
                  sentiment={
                    chatCharts.length > 0
                      ? { positive: 70, negative: 10, neutral: 20 }
                      : { positive: 50, negative: 10, neutral: 40 }
                  }
                />
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  )
}
