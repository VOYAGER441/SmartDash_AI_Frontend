'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import Dashboard from '@/components/Dashboard'
import ChatInterface from '@/components/ChatInterface'
// import ChatDetails from '@/components/ChatDetails'
import { IChart, IDashboardData } from '@/types/dashboard'

export default function DashboardPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('chat')
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(null)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const handleChartsGenerated = (charts: IChart[]) => {
    // Generate a default IDashboardData using the charts from the event
    setDashboardData({
      sessionId: 'generated-' + Date.now(),
      dashboard: {
        title: 'Generated Dashboard',
        charts: charts,
        insights: 'These insights were generated automatically based on the newly created charts.'
      }
    })
    setCurrentView('dashboard')
  }

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${currentView === view
                  ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg'
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
              dashboardData={dashboardData}
              sessionId={dashboardData?.sessionId}
            />
          )}

          {/* Chat + Details panel */}
          {currentView === 'chat' && (
            <div className="flex gap-6">
              {/* Main chat */}
              <div className="flex-1 min-w-0">
                <ChatInterface
                  isDarkTheme={isDarkTheme}
                  onChartsGenerated={handleChartsGenerated}
                />
              </div>

              {/* Chat Details panel */}

            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  )
}
