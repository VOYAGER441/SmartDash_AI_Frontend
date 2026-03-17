'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Upload, FileText, AlertCircle, Loader2 } from 'lucide-react'
import { IChart, IDashboardData } from '../types/dashboard'
import ChartRenderer from './Charts/ChartRenderer'
import { uploadDataset, sendChatQuery, fetchSuggestions, IDatasetMetadata } from '../lib/api'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  dashboardData?: IDashboardData
  file?: File
  isError?: boolean
}

interface ChatInterfaceProps {
  isDarkTheme: boolean
  datasetId?: string | null
  sessionId?: string | null
  onChartsGenerated?: (charts: IChart[]) => void
  onCSVUpload?: (file: File) => void
  onDatasetUploaded?: (metadata: IDatasetMetadata) => void
  onSessionCreated?: (sessionId: string) => void
  initialQuery?: string | null
}

const DEFAULT_SUGGESTIONS = [
  'Show me monthly sales trends',
  "What's our customer growth rate?",
  'Display revenue by product category',
  'Compare this quarter vs last quarter',
]

export default function ChatInterface({
  isDarkTheme,
  datasetId,
  sessionId,
  onChartsGenerated,
  onCSVUpload,
  onDatasetUploaded,
  onSessionCreated,
  initialQuery,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Business Intelligence assistant. Upload a CSV file first, then ask me anything about your data and I'll create interactive dashboards for you.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch suggestions when a dataset is loaded
  useEffect(() => {
    if (datasetId) {
      fetchSuggestions(datasetId).then(setSuggestions).catch(() => setSuggestions(DEFAULT_SUGGESTIONS))
    }
  }, [datasetId])

  // Auto-send initialQuery when it arrives from dashboard action buttons
  useEffect(() => {
    if (initialQuery && datasetId && !isTyping) {
      // Strip the timestamp suffix (appended to force re-trigger)
      const query = initialQuery.replace(/-\d+$/, '')
      handleSendMessage(query)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  const handleFileUpload = async (file: File) => {
    if (!(file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      addBotMessage('Please upload a valid CSV file.', true)
      return
    }

    setUploadedFile(file)
    if (onCSVUpload) onCSVUpload(file)

    // Upload to backend
    setIsUploading(true)
    addBotMessage(`Uploading **${file.name}**... Please wait.`)

    try {
      const response = await uploadDataset(file)
      const metadata = response.data

      setIsUploading(false)
      addBotMessage(
        `✅ **${metadata.originalName}** uploaded successfully!\n\n` +
        `• **${metadata.rowCount}** rows × **${metadata.columns.length}** columns\n` +
        `• Columns: ${metadata.columns.map(c => c.name).join(', ')}\n\n` +
        `Now ask me anything about your data!`
      )

      if (onDatasetUploaded) onDatasetUploaded(metadata)
    } catch (err) {
      setIsUploading(false)
      setUploadedFile(null)
      addBotMessage(`❌ Upload failed: ${(err as Error).message}`, true)
    }
  }

  const addBotMessage = (text: string, isError = false) => {
    const botMessage: Message = {
      id: Date.now().toString() + '-bot',
      text,
      sender: 'bot',
      timestamp: new Date(),
      isError,
    }
    setMessages(prev => [...prev, botMessage])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
    setIsDragging(false)
  }

  const clearFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSendMessage = async (overrideQuery?: string) => {
    const query = overrideQuery || inputText.trim()
    if (!query || isTyping) return

    // Check if a dataset is uploaded
    if (!datasetId) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: query,
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, userMessage])
      setInputText('')
      addBotMessage('⚠️ Please upload a CSV file first before asking questions about your data.', true)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    const prompt = query
    setInputText('')
    setIsTyping(true)

    try {
      const response = await sendChatQuery(prompt, datasetId, sessionId || undefined)
      const dashboardData = response.data as unknown as IDashboardData

      // Notify parent about session
      if (onSessionCreated && dashboardData.sessionId) {
        onSessionCreated(dashboardData.sessionId)
      }

      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: `📊 **${dashboardData.dashboard.title}**\n\n${dashboardData.dashboard.insights}`,
        sender: 'bot',
        timestamp: new Date(),
        dashboardData,
      }
      setMessages(prev => [...prev, botMessage])

      if (onChartsGenerated) onChartsGenerated(dashboardData.dashboard.charts)
    } catch (err) {
      addBotMessage(`❌ Sorry, something went wrong: ${(err as Error).message}`, true)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const border = isDarkTheme ? 'border-[#3F2775]/40' : 'border-gray-300'

  return (
    <div className="max-w-5xl mx-auto">
      <div className={`backdrop-blur-3xl ${isDarkTheme ? 'bg-[#3F2775]/20' : 'bg-white/90'} rounded-2xl border ${border} shadow-2xl`}>
        {/* Header */}
        <div className={`border-b ${border} p-6 flex items-center justify-between`}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3F2775] to-[#2A1E6E] rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>SmartDash AI</h2>
              <p className={`${isDarkTheme ? 'text-[#c4b5fd]' : 'text-cyan-600'} text-sm`}>
                {datasetId ? '🟢 Dataset loaded — ask questions!' : 'Upload a CSV file to get started'}
              </p>
            </div>
          </div>
          {uploadedFile && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${isDarkTheme ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>
              <FileText className="w-3.5 h-3.5" />
              {uploadedFile.name}
            </div>
          )}
        </div>

        {/* Messages area */}
        <div
          className="h-96 overflow-y-auto p-6 space-y-4"
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
        >
          {/* CSV Drop Zone — only show when no dataset */}
          {!datasetId && (
            <div className={`mb-4 p-4 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging
              ? 'border-[#3F2775] bg-[#3F2775]/15'
              : isDarkTheme
                ? 'border-[#3F2775]/40 hover:border-[#3F2775]/60'
                : 'border-cyan-300 hover:border-cyan-400'
              }`}>
              <div className="text-center">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className={`w-8 h-8 animate-spin ${isDarkTheme ? 'text-[#c4b5fd]' : 'text-cyan-600'}`} />
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-cyan-700'}`}>
                      Uploading and processing...
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${isDarkTheme ? 'text-[#3F2775]' : 'text-cyan-600'}`} />
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-cyan-700'} mb-2`}>
                      Drag & drop CSV file here or click to browse
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors ${isDarkTheme
                          ? 'bg-[#3F2775]/25 text-[#c4b5fd] hover:bg-[#3F2775]/35'
                          : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                          }`}
                      >
                        Choose File
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick Suggestions */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputText(suggestion)}
                className={`text-left px-3 py-2 text-sm rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkTheme
                  ? 'bg-[#3F2775]/15 text-[#c4b5fd] hover:bg-[#3F2775]/25 border-[#3F2775]/30'
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300'
                  }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Message list */}
          {messages.map(message => (
            <div key={message.id} className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                  ? 'bg-gradient-to-br from-pink-500 to-[#3F2775] ml-3 shadow-lg'
                  : isDarkTheme
                    ? 'bg-gray-950/60 mr-3 border border-[#3F2775]/40'
                    : 'bg-cyan-100 mr-3 border border-cyan-300'
                  }`}>
                  {message.sender === 'user'
                    ? <User className="w-5 h-5 text-white" />
                    : message.isError
                      ? <AlertCircle className="w-5 h-5 text-red-400" />
                      : <Bot className="w-5 h-5 text-[#c4b5fd]" />
                  }
                </div>
                <div className={`px-5 py-4 rounded-xl ${message.sender === 'user'
                  ? 'bg-gradient-to-br from-pink-500 to-[#3F2775] text-white shadow-lg'
                  : message.isError
                    ? isDarkTheme
                      ? 'bg-red-900/30 text-red-200 border border-red-500/40'
                      : 'bg-red-50 text-red-700 border border-red-300'
                    : isDarkTheme
                      ? 'bg-gray-950/60 text-gray-200 border border-[#3F2775]/40'
                      : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                  }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  {message.file && (
                    <div className={`mt-2 flex items-center ${isDarkTheme ? 'text-[#c4b5fd]' : 'text-cyan-600'}`}>
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-xs">{message.file.name}</span>
                    </div>
                  )}
                  {message.dashboardData && message.dashboardData.dashboard.charts && message.dashboardData.dashboard.charts.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {message.dashboardData.dashboard.charts
                        .filter(chart => chart.type !== 'metric')
                        .map(chart => (
                          <div key={chart.id} className={`${isDarkTheme ? 'bg-gray-950/40' : 'bg-cyan-50'} p-4 rounded-xl border ${isDarkTheme ? 'border-[#3F2775]/30' : 'border-cyan-200'}`}>
                            {chart.error ? (
                              <div className="text-xs text-red-400">
                                <p className="font-medium">{chart.title}</p>
                                <p>Error: {chart.error}</p>
                              </div>
                            ) : (
                              <ChartRenderer
                                type={chart.type as any}
                                data={chart.data as any[]}
                                xKey={(chart.config as any).xAxis || ''}
                                yKey={(chart.config as any).yAxis || ''}
                                title={chart.title}
                                height={200}
                                isDarkTheme={isDarkTheme}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="flex">
                <div className={`w-10 h-10 ${isDarkTheme ? 'bg-gray-950/60' : 'bg-cyan-100'} rounded-full flex items-center justify-center mr-3 border ${isDarkTheme ? 'border-[#3F2775]/40' : 'border-cyan-300'} flex-shrink-0`}>
                  <Bot className="w-5 h-5 text-[#c4b5fd]" />
                </div>
                <div className={`px-5 py-4 rounded-xl ${isDarkTheme ? 'bg-gray-950/60 border border-[#3F2775]/40' : 'bg-cyan-100 border border-cyan-300'}`}>
                  <div className="flex space-x-2">
                    {[0, 100, 200].map((delay, i) => (
                      <div key={i} className="w-3 h-3 bg-[#c4b5fd] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className={`border-t ${border} p-6`}>
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={datasetId ? 'Ask about your data...' : 'Upload a CSV file first...'}
              className={`flex-1 px-5 py-4 rounded-xl focus:outline-none transition-all duration-300 shadow-sm ${isDarkTheme
                ? 'bg-gray-950/60 border border-[#3F2775]/40 text-white placeholder-gray-500 focus:border-[#c4b5fd]/50'
                : 'bg-cyan-100 border border-cyan-300 text-gray-900 placeholder-cyan-600 focus:border-cyan-500'
                }`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className={`px-6 py-4 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${isDarkTheme
                ? 'bg-gradient-to-r from-pink-500 to-[#3F2775] text-white hover:from-pink-600'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
