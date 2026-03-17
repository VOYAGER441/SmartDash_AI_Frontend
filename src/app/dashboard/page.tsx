'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import Dashboard from '@/components/Dashboard'
import ChatInterface from '@/components/ChatInterface'
import { IChart, IDashboardData } from '@/types/dashboard'
import { IDatasetMetadata } from '@/lib/api'

export default function DashboardPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('chat')
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(null)
  const [datasetId, setDatasetId] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [pendingQuery, setPendingQuery] = useState<string | null>(null)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const handleChartsGenerated = (charts: IChart[]) => {
    setDashboardData(prev => ({
      sessionId: prev?.sessionId || sessionId || 'generated-' + Date.now(),
      dashboard: {
        title: prev?.dashboard?.title || 'Generated Dashboard',
        charts: charts,
        insights: prev?.dashboard?.insights || 'These insights were generated from your data.',
      },
    }))
    setCurrentView('dashboard')
  }

  const handleDatasetUploaded = (metadata: IDatasetMetadata) => {
    setDatasetId(metadata.id)
    // Reset session when new dataset is uploaded
    setSessionId(null)
    setDashboardData(null)
  }

  const handleSessionCreated = (newSessionId: string) => {
    setSessionId(newSessionId)
  }

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  const handleActionClick = (query: string) => {
    setPendingQuery(query + '-' + Date.now()) // append timestamp to ensure useEffect fires even for same query
    setCurrentView('chat')
  }

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

          {/* Dataset indicator */}
          {datasetId && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono ${isDarkTheme ? 'bg-[#2A3F33]/20 text-[#4ADE80] border border-[#2A3F33]/50' : 'bg-green-100 text-green-700 border border-green-300'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              Dataset: {datasetId.slice(0, 8)}...
            </div>
          )}

          {/* Dashboard */}
          {currentView === 'dashboard' && (
            <Dashboard
              isDarkTheme={isDarkTheme}
              dashboardData={dashboardData}
              sessionId={dashboardData?.sessionId || sessionId || undefined}
              onActionClick={handleActionClick}
            />
          )}

          {/* Chat + Details panel */}
          {currentView === 'chat' && (
            <div className="flex gap-6">
              {/* Main chat */}
              <div className="flex-1 min-w-0">
                <ChatInterface
                  isDarkTheme={isDarkTheme}
                  datasetId={datasetId}
                  sessionId={sessionId}
                  onChartsGenerated={handleChartsGenerated}
                  onDatasetUploaded={handleDatasetUploaded}
                  onSessionCreated={handleSessionCreated}
                  initialQuery={pendingQuery}
                />
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  )
}
