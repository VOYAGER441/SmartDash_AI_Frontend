'use client'

// Converted from SoulSync app-sidebar.tsx → Qubits format
// Replaces shadcn Sidebar with plain Tailwind + prop-driven theme

import { useState } from 'react'
import { MessageSquare, Star, Clock, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

interface ChatHistoryItem {
  id: string
  title: string
  preview: string
  timestamp: string
  isFavorite?: boolean
}

interface AppSidebarProps {
  isDarkTheme: boolean
  onSelectChat?: (id: string) => void
  activeChatId?: string
}

const SAMPLE_HISTORY: ChatHistoryItem[] = [
  { id: '1', title: 'Monthly Sales Analysis', preview: 'Show me monthly sales trends...', timestamp: '2h ago', isFavorite: true },
  { id: '2', title: 'Customer Growth Report', preview: "What's our customer growth rate?", timestamp: '5h ago' },
  { id: '3', title: 'Revenue Breakdown', preview: 'Display revenue by product category', timestamp: 'Yesterday' },
  { id: '4', title: 'Q3 vs Q4 Comparison', preview: 'Compare this quarter vs last quarter', timestamp: '2 days ago', isFavorite: true },
  { id: '5', title: 'Market Share Overview', preview: 'Pie chart of market distribution', timestamp: '3 days ago' },
]

export default function AppSidebar({ isDarkTheme, onSelectChat, activeChatId }: AppSidebarProps) {
  const [favoritesOpen, setFavoritesOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(true)

  const favorites = SAMPLE_HISTORY.filter(c => c.isFavorite)
  const recent = SAMPLE_HISTORY.filter(c => !c.isFavorite)

  const border = isDarkTheme ? 'border-purple-400/20' : 'border-gray-200'
  const itemHover = isDarkTheme ? 'hover:bg-purple-500/20' : 'hover:bg-gray-100'
  const activeClass = isDarkTheme ? 'bg-purple-500/25 border-purple-400/40' : 'bg-cyan-100 border-cyan-300'

  const ChatItem = ({ item }: { item: ChatHistoryItem }) => (
    <div
      onClick={() => onSelectChat?.(item.id)}
      className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200 group mb-1 ${activeChatId === item.id
        ? activeClass
        : `border-transparent ${itemHover}`
        }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center min-w-0 flex-1">
          <MessageSquare className={`w-4 h-4 mr-2 flex-shrink-0 ${isDarkTheme ? 'text-purple-400' : 'text-cyan-500'}`} />
          <div className="min-w-0 pr-2">
            <p className={`text-sm font-medium truncate ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
              {item.title}
            </p>
            <p className={`text-xs truncate ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
              {item.preview}
            </p>
          </div>
        </div>
        <button
          onClick={e => e.stopPropagation()}
          className={`flex-shrink-0 ml-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isDarkTheme ? 'hover:bg-red-500/20 text-gray-500 hover:text-red-400' : 'hover:bg-red-100 text-gray-400 hover:text-red-500'
            }`}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      <div className={`flex items-center mt-1 ml-6 text-xs ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
        <Clock className="w-3 h-3 mr-1" />
        {item.timestamp}
      </div>
    </div>
  )

  const SectionToggle = ({
    label,
    icon,
    open,
    onToggle,
  }: {
    label: string
    icon: React.ReactNode
    open: boolean
    onToggle: () => void
  }) => (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors ${isDarkTheme ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
    </button>
  )

  return (
    <div className={`h-full flex flex-col overflow-hidden`}>
      {/* New Chat button */}
      <div className={`p-4 border-b ${border}`}>
        <button
          onClick={() => onSelectChat?.('new')}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${isDarkTheme
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg'
            }`}
        >
          + New Chat
        </button>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Favorites */}
        <SectionToggle
          label="Favorites"
          icon={<Star className="w-3.5 h-3.5" />}
          open={favoritesOpen}
          onToggle={() => setFavoritesOpen(!favoritesOpen)}
        />
        {favoritesOpen && (
          <div className="mb-3">
            {favorites.map(item => <ChatItem key={item.id} item={item} />)}
          </div>
        )}

        {/* Recent */}
        <SectionToggle
          label="Recent"
          icon={<Clock className="w-3.5 h-3.5" />}
          open={historyOpen}
          onToggle={() => setHistoryOpen(!historyOpen)}
        />
        {historyOpen && (
          <div>
            {recent.map(item => <ChatItem key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  )
}
