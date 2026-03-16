'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import QuibitsLogo from '@/components/QuibitsLogo'

// 3D AI Brain Component
const AIBrain = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-32 h-32 mx-auto">
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 animate-pulse"
        style={{
          transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Neural Network Lines */}
        <div className="absolute inset-2 rounded-full border-2 border-white/30">
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Orbiting Elements */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-2 h-2 bg-pink-400 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-2 h-2 bg-green-400 rounded-full transform -translate-y-1/2"></div>
      </div>
    </div>
  )
}

// 3D Floating Cube Component
const FloatingCube = ({ delay = 0, duration = '3s' }) => {
  return (
    <div className="animate-bounce" style={{ animationDelay: `${delay}s`, animationDuration: duration }}>
      <div className="w-16 h-16 relative transform-gpu" style={{ transformStyle: 'preserve-3d', animation: `rotateCube ${duration} infinite linear` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm" style={{ transform: 'rotateY(90deg)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-pink-400/30 backdrop-blur-sm" style={{ transform: 'rotateX(90deg)' }}></div>
      </div>
    </div>
  )
}

// 3D DNA Helix Component
const DNAHelix = () => {
  return (
    <div className="relative w-24 h-32">
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: '50%',
              top: `${(i / 12) * 100}%`,
              transform: `translateX(-50%) rotateX(${i * 30}deg) translateZ(${i % 2 === 0 ? '20px' : '-20px'})`
            }}
          />
        ))}
      </div>
    </div>
  )
}

// 3D Neural Network Grid
const NeuralGrid = () => {
  return (
    <div className="relative w-40 h-40 opacity-60">
      <div className="absolute inset-0 grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="relative group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded border border-white/20 group-hover:from-blue-400/50 group-hover:to-purple-400/50 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-white/20 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const router = useRouter()

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  const goToDashboard = () => {
    router.push('/login')
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-20">
          <FloatingCube delay={0} duration="4s" />
        </div>
        <div className="absolute top-40 right-32">
          <FloatingCube delay={1} duration="5s" />
        </div>
        <div className="absolute bottom-32 left-40">
          <DNAHelix />
        </div>
        <div className="absolute top-60 right-20">
          <NeuralGrid />
        </div>

        {/* Animated Particles */}
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            // style={{
            //   // left: `${(Math.random() * 100).toFixed(1)}%`,
            //   // top: `${(Math.random() * 100).toFixed(1)}%`,
            //   animationDelay: `${Math.random() * 3}s`,
            //   animationDuration: `${2 + Math.random() * 2}s`
            // }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-4 left-4 z-40">
        <QuibitsLogo
          isDarkTheme={isDarkTheme}
          size="lg"
          showText={true}
          onClick={() => console.log('Logo clicked')}
        />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
          {/* 3D AI Brain Hero */}
          <div className="space-y-6">
            <AIBrain />
            <h1 className={`text-6xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'} animate-pulse`}>
              SmartDash AI
            </h1>
            <p className={`text-xl ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Advanced Business Intelligence Dashboard powered by AI
            </p>
          </div>

          {/* Features with 3D Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-900/60 border border-gray-800' : 'bg-gray-100 border border-gray-200'} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
              <div className="text-3xl mb-4">🧠</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                AI-Powered Analytics
              </h3>
              <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Machine learning algorithms analyze your data in real-time
              </p>
            </div>

            <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-900/60 border border-gray-800' : 'bg-gray-100 border border-gray-200'} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
              <div className="text-3xl mb-4">🔮</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                Predictive Insights
              </h3>
              <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Forecast trends and make data-driven decisions with confidence
              </p>
            </div>

            <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-900/60 border border-gray-800' : 'bg-gray-100 border border-gray-200'} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                Real-time Processing
              </h3>
              <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Instant data visualization with neural network acceleration
              </p>
            </div>
          </div>

          {/* CTA Button with 3D Effect */}
          <div className="mt-12">
            <button
              onClick={goToDashboard}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-300 shadow-lg text-lg font-semibold transform hover:scale-105 hover:shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Go to Dashboard</span>

              {/* 3D Border Effect */}
              <div className="absolute inset-0 rounded-lg border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Background Gradient with Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-96 h-96 rounded-full ${isDarkTheme ? 'bg-blue-500/10' : 'bg-blue-200/20'} blur-3xl -top-48 -left-48 animate-pulse`}></div>
        <div className={`absolute w-96 h-96 rounded-full ${isDarkTheme ? 'bg-purple-500/10' : 'bg-purple-200/20'} blur-3xl -bottom-48 -right-48 animate-pulse`}></div>
        <div className={`absolute w-96 h-96 rounded-full ${isDarkTheme ? 'bg-pink-500/10' : 'bg-pink-200/20'} blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
      </div>

      <style jsx>{`
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}
