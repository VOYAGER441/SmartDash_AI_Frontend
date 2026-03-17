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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
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
  type: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'table' | 'scatter' | 'metric'
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
      case 'line': {
        const renderYKeys = yKey ? [yKey] : Object.keys(data[0] || {}).filter(k => k !== xKey && typeof data[0][k] === 'number')
        if (renderYKeys.length === 0 && data[0]) {
          // Fallback if no numbers found, just pick the first non-xKey
          renderYKeys.push(Object.keys(data[0]).find(k => k !== xKey) || 'value')
        }
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
              {renderYKeys.map((key, index) => (
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
      }

      case 'bar': {
        const renderYKeys = yKey ? [yKey] : Object.keys(data[0] || {}).filter(k => k !== xKey && typeof data[0][k] === 'number')
        if (renderYKeys.length === 0 && data[0]) {
          renderYKeys.push(Object.keys(data[0]).find(k => k !== xKey) || 'value')
        }
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
              {renderYKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={COLORS[index % COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )
      }

      case 'pie': {
        const renderYKey = yKey || Object.keys(data[0] || {}).find(k => k !== xKey && typeof data[0][k] === 'number') || 'value'
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                fill="#8884d8"
                dataKey={renderYKey}
                nameKey={xKey}
                paddingAngle={0}
                stroke="none"
              >
                {data.map((entry: any, index: number) => {
                  return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      }

      case 'area': {
        const renderYKeys = yKey ? [yKey] : Object.keys(data[0] || {}).filter(k => k !== xKey && typeof data[0][k] === 'number')
        if (renderYKeys.length === 0 && data[0]) {
          renderYKeys.push(Object.keys(data[0]).find(k => k !== xKey) || 'value')
        }
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
              {renderYKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )
      }

      case 'donut': {
        const renderYKey = yKey || Object.keys(data[0] || {}).find(k => k !== xKey && typeof data[0][k] === 'number') || 'value'
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                fill="#8884d8"
                dataKey={renderYKey}
                nameKey={xKey}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
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
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )
      }

      case 'scatter': {
        const scatterYKey = yKey || Object.keys(data[0] || {}).find(k => k !== xKey && typeof data[0][k] === 'number') || 'value'
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#374151' : '#e5e7eb'} />
              <XAxis
                dataKey={xKey}
                tick={{ fill: isDarkTheme ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
                name={xKey}
              />
              <YAxis
                dataKey={scatterYKey}
                tick={{ fill: isDarkTheme ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDarkTheme ? '#374151' : '#e5e7eb' }}
                name={scatterYKey}
              />
              <ZAxis range={[60, 200]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: isDarkTheme ? '#f3f4f6' : '#374151'
                }}
              />
              <Legend />
              <Scatter name={scatterYKey} data={data} fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        )
      }

      case 'table': {
        if (!data || data.length === 0) return <div className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>No data</div>
        const columns = Object.keys(data[0])
        return (
          <div className="overflow-x-auto rounded-lg" style={{ maxHeight: height }}>
            <table className="w-full text-sm">
              <thead>
                <tr className={isDarkTheme ? 'bg-gray-800/60' : 'bg-gray-100'}>
                  {columns.map(col => (
                    <th
                      key={col}
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkTheme ? 'text-gray-300 border-b border-gray-700' : 'text-gray-600 border-b border-gray-200'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={`${
                      isDarkTheme
                        ? rowIdx % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/20'
                        : rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } transition-colors ${isDarkTheme ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'}`}
                  >
                    {columns.map(col => (
                      <td
                        key={col}
                        className={`px-4 py-2.5 ${
                          isDarkTheme ? 'text-gray-200 border-b border-gray-800' : 'text-gray-700 border-b border-gray-100'
                        }`}
                      >
                        {typeof row[col] === 'number' ? row[col].toLocaleString() : String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      case 'metric': {
        const valueKey = yKey || 'value'
        const val = data[0]?.[valueKey] ?? data[0]?.[Object.keys(data[0] || {})[0]] ?? '—'
        const secondary = data[0]?.['secondary'] || ''
        return (
          <div className="flex flex-col items-center justify-center" style={{ minHeight: height / 2 }}>
            <span className={`text-4xl font-bold tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {String(val)}
            </span>
            {secondary && (
              <span className={`text-sm mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {String(secondary)}
              </span>
            )}
          </div>
        )
      }

      default:
        return <div className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>Unsupported chart type: {type}</div>
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
