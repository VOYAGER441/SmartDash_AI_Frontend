// 'use client'

// // Converted from SoulSync chat-details.tsx → Qubits format
// // Displays chat report / sentiment details — no Appwrite, no shadcn

// import { TrendingUp, TrendingDown, Minus, BarChart2, MessageCircle, Clock } from 'lucide-react'
// import ChartRenderer from './Charts/ChartRenderer'

// interface SentimentData {
//   positive: number
//   negative: number
//   neutral: number
// }

// interface ChatDetailsProps {
//   isDarkTheme: boolean
//   chatTitle?: string
//   messageCount?: number
//   duration?: string
//   sentiment?: SentimentData
// }

// export default function ChatDetails({
//   isDarkTheme,
//   chatTitle = 'Monthly Sales Analysis',
//   messageCount = 12,
//   duration = '8 min',
//   sentiment = { positive: 65, negative: 15, neutral: 20 },
// }: ChatDetailsProps) {
//   const border = isDarkTheme ? 'border-purple-400/30' : 'border-gray-200'
//   const cardBg = isDarkTheme ? 'bg-purple-900/20' : 'bg-gray-50'

//   const sentimentChartData = [
//     { name: 'Positive', value: sentiment.positive },
//     { name: 'Negative', value: sentiment.negative },
//     { name: 'Neutral', value: sentiment.neutral },
//   ]

//   const dominantSentiment =
//     sentiment.positive >= sentiment.negative && sentiment.positive >= sentiment.neutral
//       ? 'positive'
//       : sentiment.negative >= sentiment.neutral
//       ? 'negative'
//       : 'neutral'

//   const SentimentIcon = dominantSentiment === 'positive'
//     ? TrendingUp
//     : dominantSentiment === 'negative'
//     ? TrendingDown
//     : Minus

//   const sentimentColor =
//     dominantSentiment === 'positive'
//       ? 'text-green-400'
//       : dominantSentiment === 'negative'
//       ? 'text-red-400'
//       : 'text-yellow-400'

//   return (
//     <div className={`backdrop-blur-2xl ${isDarkTheme ? 'bg-[#171717]/90' : 'bg-white/90'} rounded-2xl border ${border} shadow-2xl p-6 space-y-6`}>
//       {/* Header */}
//       <div>
//         <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Chat Report</h3>
//         <p className={`text-sm mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{chatTitle}</p>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-3 gap-4">
//         {[
//           { icon: MessageCircle, label: 'Messages', value: messageCount },
//           { icon: Clock, label: 'Duration', value: duration },
//           { icon: SentimentIcon, label: 'Mood', value: dominantSentiment, colorClass: sentimentColor },
//         ].map(({ icon: Icon, label, value, colorClass }) => (
//           <div key={label} className={`${cardBg} rounded-xl p-4 border ${border} text-center`}>
//             <Icon className={`w-5 h-5 mx-auto mb-2 ${colorClass ?? (isDarkTheme ? 'text-purple-400' : 'text-cyan-500')}`} />
//             <div className={`text-lg font-bold capitalize ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{value}</div>
//             <div className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>{label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Sentiment chart */}
//       <div>
//         <div className="flex items-center mb-3">
//           <BarChart2 className={`w-4 h-4 mr-2 ${isDarkTheme ? 'text-purple-400' : 'text-cyan-500'}`} />
//           <h4 className={`text-sm font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
//             Sentiment Breakdown
//           </h4>
//         </div>
//         <ChartRenderer
//           type="pie"
//           data={sentimentChartData}
//           xKey="name"
//           yKey="value"
//           title=""
//           height={180}
//           isDarkTheme={isDarkTheme}
//         />
//       </div>

//       {/* Sentiment bars */}
//       <div className="space-y-3">
//         {[
//           { label: 'Positive', value: sentiment.positive, color: 'bg-green-500' },
//           { label: 'Neutral', value: sentiment.neutral, color: 'bg-yellow-500' },
//           { label: 'Negative', value: sentiment.negative, color: 'bg-red-500' },
//         ].map(({ label, value, color }) => (
//           <div key={label}>
//             <div className="flex justify-between text-xs mb-1">
//               <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>{label}</span>
//               <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>{value}%</span>
//             </div>
//             <div className={`w-full h-2 rounded-full ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
//               <div
//                 className={`h-2 rounded-full ${color} transition-all duration-700`}
//                 style={{ width: `${value}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
