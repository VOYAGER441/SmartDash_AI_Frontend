'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface ChartData {
  [key: string]: any
}

interface ChartRendererProps {
  type: 'line' | 'bar' | 'pie' | 'area'
  data: ChartData[]
  xKey: string
  yKey: string
  title: string
  width?: number
  height?: number
  isDarkTheme?: boolean
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316']

export default function ChartRenderer({ 
  type, 
  data, 
  xKey, 
  yKey, 
  title, 
  width = 400, 
  height = 300,
  isDarkTheme = true
}: ChartRendererProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xKey} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              {data[0] && Object.keys(data[0]).filter(key => key !== xKey && key !== yKey).map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#374151' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey={xKey} 
                tick={{ fill: isDarkTheme ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: isDarkTheme ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: isDarkTheme ? '#f3f4f6' : '#374151'
                }}
                cursor={{ fill: isDarkTheme ? '#374151' : '#f3f4f6', opacity: 0.4 }}
              />
              <Legend verticalAlign="bottom" height={36}/>
              <Bar dataKey={yKey} fill="#4ade80" radius={[4, 4, 0, 0]} />
              {data[0] && Object.keys(data[0]).filter(key => key !== xKey && key !== yKey).map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={COLORS[(index + 1) % COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey={yKey}
                paddingAngle={0}
                stroke="none"
              >
                {data.map((entry: any, index: number) => {
                  const colors = isDarkTheme ? ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'] : ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                })}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: isDarkTheme ? '#f3f4f6' : '#374151'
                }}
              />
              <Legend verticalAlign="top" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey={xKey} 
                tick={{ fill: isDarkTheme ? '#6b7280' : '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: isDarkTheme ? '#6b7280' : '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: isDarkTheme ? '#f3f4f6' : '#374151'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={yKey} 
                stroke={isDarkTheme ? '#8B5CF6' : '#8B5CF6'} 
                fill={isDarkTheme ? '#8B5CF6' : '#8B5CF6'}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              {data[0] && Object.keys(data[0]).filter(key => key !== xKey && key !== yKey).map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[(index + 2) % COLORS.length]}
                  fill={COLORS[(index + 2) % COLORS.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )

      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <div className="w-full">
      <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>{title}</h3>
      <div className={`backdrop-blur-2xl ${isDarkTheme ? 'bg-[#171717]/60' : 'bg-white/80'} p-4 rounded-lg border ${isDarkTheme ? 'border-white/10' : 'border-gray-200'}`}>
        {renderChart()}
      </div>
    </div>
  )
}
