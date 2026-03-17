'use client'

import React from 'react'
import { IChart, IDashboard, IDashboardData, IMetricConfig } from '../types/dashboard'
import ChartRenderer from './Charts/ChartRenderer'
import { ArrowUpRight } from 'lucide-react'

interface DashboardProps {
  isDarkTheme: boolean
  dashboardData: IDashboardData | null
  sessionId?: string
  onActionClick?: (query: string) => void
}

export default function Dashboard({ isDarkTheme, dashboardData, sessionId, onActionClick }: DashboardProps) {
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className={`text-xl ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          Please upload a CSV file or ask a question to generate a dashboard.
        </div>
      </div>
    )
  }

  const { title, charts, insights } = dashboardData.dashboard

  // Separate metrics from other charts
  const metrics = charts.filter((c: IChart) => c.type === 'metric')
  const regularCharts = charts.filter((c: IChart) => c.type !== 'metric')

  const border = isDarkTheme ? 'border-[#3F2775]/40' : 'border-gray-300'
  return (
    <div className={`w-full p-4 mx-auto rounded-xl ${isDarkTheme ? 'bg-[#3F2775]/20' : 'bg-white/90'} rounded-2xl border ${border} shadow-2xl`}>
      {/* Title block */}
      <div className="mb-8">
        <h1 className={`text-3xl font-semibold mb-2 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
        <div className="flex flex-col gap-4">
          <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Jan - Sep • East & West</span>
          {sessionId && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono w-fit ${isDarkTheme ? 'bg-[#2A3F33]/20 text-[#4ADE80] border border-[#2A3F33]/50' : 'bg-green-100 text-green-700'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
              {sessionId}
            </div>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 border-b border-[#333333] pb-8">
          {metrics.map((metric: IChart) => {
            const config = metric.config as IMetricConfig
            const value = metric.data[0]?.[config.valueKey || 'value'] || 0
            const secondaryText = metric.data[0]?.['secondary'] || ''
            return (
              <div key={metric.id} className="flex flex-col">
                <span className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  {metric.title}
                </span>
                <span className={`text-3xl font-bold mb-1 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  {config.prefix}{value}
                </span>
                <span className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-600'}`}>
                  {secondaryText}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Main Charts area */}
      {regularCharts.length > 0 && (
        <div className="w-full flex flex-col gap-4 mb-10">
          {/* Top full-width chart */}
          {regularCharts[0] && (
            <div className={`w-full p-6 rounded-xl border ${isDarkTheme ? 'bg-[#2D2D2D] border-[#383838]' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                {regularCharts[0].title}
              </h3>
              <ChartRenderer
                type={regularCharts[0].type as any}
                data={regularCharts[0].data as any[]}
                xKey={(regularCharts[0].config as any).xAxis || ''}
                yKey={(regularCharts[0].config as any).yAxis || ''}
                title=""
                isDarkTheme={isDarkTheme}
                height={260}
              />
            </div>
          )}

          {/* Bottom row of charts */}
          {regularCharts.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regularCharts.slice(1, 4).map((chart: IChart) => (
                <div key={chart.id} className={`p-6 rounded-xl border ${isDarkTheme ? 'bg-[#2D2D2D] border-[#383838]' : 'bg-white border-gray-200'} flex flex-col`}>
                  <h3 className={`text-sm font-medium mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                    {chart.title}
                  </h3>
                  <div className="flex-1 flex items-center justify-center">
                    <ChartRenderer
                      type={chart.type as any}
                      data={chart.data as any[]}
                      xKey={(chart.config as any).xAxis || ''}
                      yKey={(chart.config as any).yAxis || ''}
                      title=""
                      isDarkTheme={isDarkTheme}
                      height={220}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Insights & Actions Block */}
      <div className="flex flex-col gap-6">
        {/* AI Insights */}
        {insights && (
          <div className={`relative pl-4 border-l-2 border-[#3B82F6]`}>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              AI INSIGHTS
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              {insights}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-2 border-t border-[#333333] pt-6">
          {['Growth analysis', 'Peak month deep-dive', 'Margin vs volume'].map(btn => (
            <button
              key={btn}
              onClick={() => onActionClick?.(btn)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors ${isDarkTheme
                ? 'bg-transparent border-[#404040] text-gray-300 hover:bg-[#333333]'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {btn}
              <ArrowUpRight className="w-4 h-4 text-gray-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
