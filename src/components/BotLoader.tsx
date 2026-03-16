'use client'

// Converted from SoulSync BotLoader.tsx → Qubits format
// Prop-driven theme, no shadcn/ui dependencies

interface BotLoaderProps {
  isDarkTheme: boolean
  text?: string
}

export default function BotLoader({ isDarkTheme, text = 'Thinking...' }: BotLoaderProps) {
  return (
    <div className="flex items-center space-x-3 px-4 py-3">
      {/* Animated dots */}
      <div className="flex space-x-1.5">
        {[0, 150, 300].map((delay, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full animate-bounce ${
              isDarkTheme ? 'bg-[#c4b5fd]' : 'bg-cyan-500'
            }`}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{text}</span>
    </div>
  )
}
