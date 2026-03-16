'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, RefreshCw, Filter, Maximize2, Grid3x3, Upload, LogOut } from 'lucide-react'
import ChartRenderer from './Charts/ChartRenderer'
import LogoutButton from './LogoutButton'

interface ChartData {
  id: string
  type: 'line' | 'bar' | 'pie' | 'area'
  title: string
  data: any[]
  xKey: string
  yKey: string
}

interface DashboardProps {
  isDarkTheme: boolean
  charts?: ChartData[]
  onLogout?: () => void
  onChartsGenerated?: (charts: ChartData[]) => void
}

export default function Dashboard({ isDarkTheme, charts: initialCharts = [], onLogout, onChartsGenerated }: DashboardProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [charts, setCharts] = useState<ChartData[]>(initialCharts)

  const onFilter = () => {
    console.log('Filter clicked')
  }

  const onRefresh = () => {
    console.log('Refresh clicked')
  }

  const sampleCharts: ChartData[] = [
    {
      id: '1',
      type: 'line',
      title: 'Monthly Revenue Trend',
      data: [
        { month: 'Jan', revenue: 125000, target: 120000 },
        { month: 'Feb', revenue: 135000, target: 125000 },
        { month: 'Mar', revenue: 145000, target: 130000 },
        { month: 'Apr', revenue: 155000, target: 140000 },
        { month: 'May', revenue: 165000, target: 150000 },
        { month: 'Jun', revenue: 175000, target: 160000 }
      ],
      xKey: 'month',
      yKey: 'revenue'
    },
    {
      id: '2',
      type: 'bar',
      title: 'Sales by Region',
      data: [
        { region: 'North', sales: 350000, target: 320000 },
        { region: 'South', sales: 280000, target: 300000 },
        { region: 'East', sales: 220000, target: 250000 },
        { region: 'West', sales: 150000, target: 180000 }
      ],
      xKey: 'region',
      yKey: 'sales'
    },
    {
      id: '3',
      type: 'pie',
      title: 'Product Category Distribution',
      data: [
        { category: 'Electronics', revenue: 420000 },
        { category: 'Clothing', revenue: 280000 },
        { category: 'Home & Garden', revenue: 180000 },
        { category: 'Sports', revenue: 120000 }
      ],
      xKey: 'category',
      yKey: 'revenue'
    },
    {
      id: '4',
      type: 'area',
      title: 'Customer Growth',
      data: [
        { month: 'Jan', customers: 1200, newCustomers: 150 },
        { month: 'Feb', customers: 1350, newCustomers: 180 },
        { month: 'Mar', customers: 1530, newCustomers: 220 },
        { month: 'Apr', customers: 1750, newCustomers: 280 },
        { month: 'May', customers: 2030, newCustomers: 350 },
        { month: 'Jun', customers: 2380, newCustomers: 420 }
      ],
      xKey: 'month',
      yKey: 'customers'
    }
  ]

  const displayCharts = charts

  const generateSampleChart = (type: 'pie' | 'bar' | 'line', title: string) => {
    const sampleData = type === 'pie' 
      ? [
          { name: 'Product A', value: 35 },
          { name: 'Product B', value: 25 },
          { name: 'Product C', value: 20 },
          { name: 'Product D', value: 20 }
        ]
      : type === 'bar'
        ? [
            { month: 'Jan', sales: 4000 },
            { month: 'Feb', sales: 3000 },
            { month: 'Mar', sales: 5000 },
            { month: 'Apr', sales: 4500 },
            { month: 'May', sales: 6000 }
          ]
        : [
            { month: 'Jan', revenue: 4000 },
            { month: 'Feb', revenue: 3000 },
            { month: 'Mar', revenue: 5000 },
            { month: 'Apr', revenue: 4500 },
            { month: 'May', revenue: 6000 },
            { month: 'Jun', revenue: 7000 }
          ]

    const newChart: ChartData = {
      id: `sample-${Date.now()}`,
      type,
      title,
      data: sampleData,
      xKey: type === 'pie' ? 'name' : type === 'bar' ? 'month' : 'month',
      yKey: type === 'pie' ? 'value' : type === 'bar' ? 'sales' : 'revenue'
    }

    // Add to charts array
    setCharts(prev => [...prev, newChart])
    
    // Notify parent component
    if (onChartsGenerated) {
      onChartsGenerated([newChart])
    }
  }

  return (
    <div className="space-y-8 flex items-center justify-center min-h-full">
      {displayCharts.length === 0 ? (
        <div className={`backdrop-blur-3xl ${isDarkTheme ? 'bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} rounded-3xl border ${isDarkTheme ? 'border-purple-400/30' : 'border-gray-300'} shadow-2xl p-16 text-center max-w-2xl mx-auto`}>
          <div className={`${isDarkTheme ? 'text-purple-500' : 'text-gray-500'} mb-8`}>
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>No Data Available</h3>
          <p className={`${isDarkTheme ? 'text-purple-400' : 'text-gray-600'} text-lg mb-6`}>
            Please upload a CSV file or interact with the chat interface to generate visualizations.
          </p>
          <div className={`inline-flex items-center px-6 py-3 ${isDarkTheme ? 'bg-gradient-to-r from-purple-500/20 to-indigo-600/20' : 'bg-gradient-to-r from-cyan-50 to-blue-50'} rounded-xl border ${isDarkTheme ? 'border-purple-400/30' : 'border-cyan-300'} hover:${isDarkTheme ? 'border-purple-400/50' : 'border-cyan-400'} transition-all duration-300`}>
            <Upload className="w-5 h-5 mr-2 text-purple-400" />
            <span className={`${isDarkTheme ? 'text-purple-300' : 'text-gray-700'} font-medium`}>
              Upload CSV to Get Started
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Data Visualization Section */}
          <div className={`backdrop-blur-3xl ${isDarkTheme ? 'bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} rounded-3xl border ${isDarkTheme ? 'border-purple-400/30' : 'border-gray-300'} shadow-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>
                  📊 Quick Chart Visualizations
                </h2>
                <p className={`${isDarkTheme ? 'text-purple-400' : 'text-gray-600'} text-lg`}>
                  Generate sample charts instantly
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: 'pie', title: 'Sales Distribution', icon: '🥧', description: 'View product sales breakdown' },
                { type: 'bar', title: 'Revenue Analysis', icon: '📊', description: 'Compare monthly revenue' },
                { type: 'line', title: 'Growth Trends', icon: '📈', description: 'Track performance over time' }
              ].map((chart, index) => (
                <button
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                    isDarkTheme 
                      ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20' 
                      : 'bg-cyan-100 border-cyan-300 hover:bg-cyan-200 hover:border-cyan-400 hover:shadow-cyan-300/20'
                  }`}
                  onClick={() => generateSampleChart(chart.type as 'pie' | 'bar' | 'line', chart.title)}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3 transform transition-transform duration-300 group-hover:scale-110">
                      {chart.icon}
                    </div>
                    <div className={`text-lg font-medium ${isDarkTheme ? 'text-purple-300' : 'text-cyan-700'} mb-2`}>
                      {chart.title}
                    </div>
                    <div className={`text-sm ${isDarkTheme ? 'text-purple-400' : 'text-cyan-600'} mb-3`}>
                      {chart.description}
                    </div>
                    <div className={`text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDarkTheme ? 'text-purple-400' : 'text-cyan-600'
                    }`}>
                      Click to generate
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Header */}
          <div className={`backdrop-blur-3xl ${isDarkTheme ? 'bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} rounded-3xl border ${isDarkTheme ? 'border-purple-400/30' : 'border-gray-300'} shadow-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>Business Intelligence Dashboard</h2>
                <p className={`${isDarkTheme ? 'text-purple-400' : 'text-gray-600'} text-lg`}>Real-time insights and analytics</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className={`p-3 ${isDarkTheme ? 'text-purple-300 hover:text-white hover:bg-purple-500/20' : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100'} rounded-lg transition-all duration-200 shadow-md`}
                  title="Toggle view"
                >
                  {viewMode === 'grid' ? <Grid3x3 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={onFilter}
                  className={`flex items-center px-4 py-3 ${isDarkTheme ? 'text-purple-300 hover:text-white hover:bg-purple-500/20' : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100'} rounded-lg transition-all duration-200 shadow-md`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button
                  onClick={onRefresh}
                  className={`flex items-center px-4 py-3 ${isDarkTheme ? 'text-purple-300 hover:text-white hover:bg-purple-500/20' : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100'} rounded-lg transition-all duration-200 shadow-md`}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
                <button className={`flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl`}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                {onLogout && (
                  <LogoutButton 
                    onLogout={onLogout}
                    isDarkTheme={isDarkTheme}
                    variant="topbar"
                    size="sm"
                    showConfirmation={true}
                  />
                )}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`${isDarkTheme ? 'bg-gradient-to-br from-purple-500/25 to-indigo-600/25' : 'bg-gradient-to-br from-cyan-50 to-blue-100'} p-6 rounded-xl border ${isDarkTheme ? 'border-purple-400/40' : 'border-cyan-200'} hover:${isDarkTheme ? 'border-purple-400/60' : 'border-cyan-300'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-400 text-sm font-semibold">Total Revenue</div>
                  <div className="w-8 h-8 bg-purple-500/25 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>$1.2M</div>
                <div className="flex items-center text-green-400 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  12% from last month
                </div>
              </div>
              
              <div className={`${isDarkTheme ? 'bg-gradient-to-br from-indigo-500/25 to-blue-600/25' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-400/40' : 'border-blue-200'} hover:${isDarkTheme ? 'border-indigo-400/60' : 'border-blue-300'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-indigo-400 text-sm font-semibold">Active Customers</div>
                  <div className="w-8 h-8 bg-indigo-500/25 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>2,380</div>
                <div className="flex items-center text-green-400 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  8% from last month
                </div>
              </div>
              
              <div className={`${isDarkTheme ? 'bg-gradient-to-br from-blue-500/25 to-cyan-600/25' : 'bg-gradient-to-br from-indigo-50 to-cyan-100'} p-6 rounded-xl border ${isDarkTheme ? 'border-blue-400/40' : 'border-indigo-200'} hover:${isDarkTheme ? 'border-blue-400/60' : 'border-indigo-300'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-blue-400 text-sm font-semibold">Conversion Rate</div>
                  <div className="w-8 h-8 bg-blue-500/25 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>3.2%</div>
                <div className="flex items-center text-green-400 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  0.5% from last month
                </div>
              </div>
              
              <div className={`${isDarkTheme ? 'bg-gradient-to-br from-cyan-500/25 to-teal-600/25' : 'bg-gradient-to-br from-cyan-50 to-teal-100'} p-6 rounded-xl border ${isDarkTheme ? 'border-cyan-400/40' : 'border-cyan-200'} hover:${isDarkTheme ? 'border-cyan-400/60' : 'border-cyan-300'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-cyan-400 text-sm font-semibold">Avg Order Value</div>
                  <div className="w-8 h-8 bg-cyan-500/25 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>$485</div>
                <div className="flex items-center text-green-400 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  $25 from last month
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' 
              : 'space-y-8'
            }
          `}>
            {displayCharts.map((chart) => (
              <div
                key={chart.id}
                className={`
                  ${viewMode === 'list' ? 'w-full' : ''}
                `}
              >
                <ChartRenderer
                  type={chart.type}
                  data={chart.data}
                  xKey={chart.xKey}
                  yKey={chart.yKey}
                  title={chart.title}
                  height={viewMode === 'list' ? 400 : 350}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
