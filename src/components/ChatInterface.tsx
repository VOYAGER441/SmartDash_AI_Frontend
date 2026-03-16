'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Upload, FileText } from 'lucide-react'
import { IChart, IDashboardData } from '../types/dashboard'
import ChartRenderer from './Charts/ChartRenderer'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  dashboardData?: IDashboardData
  file?: File
}

interface ChatInterfaceProps {
  isDarkTheme: boolean
  onChartsGenerated?: (charts: IChart[]) => void
  onCSVUpload?: (file: File) => void
}

const SUGGESTIONS = [
  'Show me monthly sales trends',
  "What's our customer growth rate?",
  'Display revenue by product category',
  'Compare this quarter vs last quarter',
]

export default function ChatInterface({ isDarkTheme, onChartsGenerated, onCSVUpload }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Business Intelligence assistant. Ask me anything about your data, and I'll create interactive dashboards for you.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setUploadedFile(file)
      if (onCSVUpload) onCSVUpload(file)
    }
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

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const dashboardData: IDashboardData = {
        sessionId: 'b3b07d00-5684-4882-b278-fcdb5ab49db3',
        dashboard: {
          title: 'Monthly Revenue Performance by Region',
          insights: 'The analysis shows distinct revenue patterns across different regions over the months. By tracking the line chart, you can identify which regions are experiencing growth and which are seasonal, while the pie chart highlights the dominant market contributors.',
          charts: [
            {
              id: 'metric-1',
              title: 'TOTAL REVENUE',
              type: 'metric',
              sql: '',
              config: {
                valueKey: 'value',
                prefix: '$'
              },
              data: [
                { value: '1.55M', secondary: 'Jan - Sep combined' }
              ]
            },
            {
              id: 'metric-2',
              title: 'EAST REGION',
              type: 'metric',
              sql: '',
              config: {
                valueKey: 'value',
                prefix: '$'
              },
              data: [
                { value: '781K', secondary: '50.2% of total' }
              ]
            },
            {
              id: 'metric-3',
              title: 'WEST REGION',
              type: 'metric',
              sql: '',
              config: {
                valueKey: 'value',
                prefix: '$'
              },
              data: [
                { value: '774K', secondary: '49.8% of total' }
              ]
            },
            {
              id: 'metric-4',
              title: 'AVG MARGIN',
              type: 'metric',
              sql: '',
              config: {
                valueKey: 'value',
                prefix: ''
              },
              data: [
                { value: '30.4%', secondary: 'East 30.5% · West 30.2%' }
              ]
            },
            {
              id: 'chart-1',
              type: 'line',
              title: 'Monthly revenue trends by region',
              sql: '',
              config: {
                xAxis: 'month',
                yAxis: 'revenue'
              },
              data: [
                { month: 'Jan', East: 72000, West: 69000 },
                { month: 'Feb', East: 76000, West: 75000 },
                { month: 'Mar', East: 77000, West: 81000 },
                { month: 'Apr', East: 81000, West: 83000 },
                { month: 'May', East: 92000, West: 89000 },
                { month: 'Jun', East: 93000, West: 90000 },
                { month: 'Jul', East: 95000, West: 93000 },
                { month: 'Aug', East: 92000, West: 91000 },
              ]
            },
            {
              id: 'chart-2',
              type: 'pie',
              title: 'Revenue distribution by region',
              sql: '',
              config: {
                xAxis: 'region',
                yAxis: 'value'
              },
              data: [
                { region: 'East', value: 781000 },
                { region: 'West', value: 774000 }
              ]
            },
            {
              id: 'chart-3',
              type: 'bar',
              title: 'Avg profit margin by region',
              sql: '',
              config: {
                xAxis: 'region',
                yAxis: 'margin'
              },
              data: [
                { region: 'East', margin: 30.5 },
                { region: 'West', margin: 30.2 }
              ]
            }
          ]
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've analyzed your data and created some visualizations for you!",
        sender: 'bot',
        timestamp: new Date(),
        dashboardData,
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      if (onChartsGenerated) onChartsGenerated(dashboardData.dashboard.charts)
    }, 1500)
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
        <div className={`border-b ${border} p-6 flex items-center`}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#3F2775] to-[#2A1E6E] rounded-full flex items-center justify-center mr-4 shadow-lg">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>SmartDash AI</h2>
            <p className={`${isDarkTheme ? 'text-[#c4b5fd]' : 'text-cyan-600'} text-sm`}>
              Ask questions or upload CSV files for analysis
            </p>
          </div>
        </div>

        {/* Messages area */}
        <div
          className="h-96 overflow-y-auto p-6 space-y-4"
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
        >
          {/* CSV Drop Zone */}
          <div className={`mb-4 p-4 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging
            ? 'border-[#3F2775] bg-[#3F2775]/15'
            : isDarkTheme
              ? 'border-[#3F2775]/40 hover:border-[#3F2775]/60'
              : 'border-cyan-300 hover:border-cyan-400'
            }`}>
            <div className="text-center">
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
                {uploadedFile && (
                  <button
                    onClick={clearFile}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${isDarkTheme
                      ? 'bg-red-500/25 text-red-300 hover:bg-red-500/35'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
          {uploadedFile && (
            <div className={`mt-2 text-2xl  ${isDarkTheme ? 'text-gray-400' : 'text-cyan-600'}`}>
              📄 {uploadedFile.name}
            </div>
          )}

          {/* Quick Suggestions */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {SUGGESTIONS.map((suggestion, index) => (
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
                    : <Bot className="w-5 h-5 text-[#c4b5fd]" />
                  }
                </div>
                <div className={`px-5 py-4 rounded-xl ${message.sender === 'user'
                  ? 'bg-gradient-to-br from-pink-500 to-[#3F2775] text-white shadow-lg'
                  : isDarkTheme
                    ? 'bg-gray-950/60 text-gray-200 border border-[#3F2775]/40'
                    : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                  }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.file && (
                    <div className={`mt-2 flex items-center ${isDarkTheme ? 'text-[#c4b5fd]' : 'text-cyan-600'}`}>
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-xs">{message.file.name}</span>
                    </div>
                  )}
                  {message.dashboardData && message.dashboardData.dashboard.charts && message.dashboardData.dashboard.charts.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {message.dashboardData.dashboard.charts.map(chart => (
                        <div key={chart.id} className={`${isDarkTheme ? 'bg-gray-950/40' : 'bg-cyan-50'} p-4 rounded-xl border ${isDarkTheme ? 'border-[#3F2775]/30' : 'border-cyan-200'}`}>
                          <ChartRenderer
                            type={chart.type as any}
                            data={chart.data as any[]}
                            xKey={(chart.config as any).xAxis || ''}
                            yKey={(chart.config as any).yAxis || ''}
                            title={chart.title}
                            height={200}
                            isDarkTheme={isDarkTheme}
                          />
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
              placeholder="Ask about your data..."
              className={`flex-1 px-5 py-4 rounded-xl focus:outline-none transition-all duration-300 shadow-sm ${isDarkTheme
                ? 'bg-gray-950/60 border border-[#3F2775]/40 text-white placeholder-gray-500 focus:border-[#c4b5fd]/50'
                : 'bg-cyan-100 border border-cyan-300 text-gray-900 placeholder-cyan-600 focus:border-cyan-500'
                }`}
            />
            <button
              onClick={handleSendMessage}
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
