'use client'

import { useEffect, useState } from 'react'

interface CustomScrollbarProps {
  children: React.ReactNode
  isDarkTheme: boolean
  className?: string
}

export default function CustomScrollbar({ children, isDarkTheme, className = '' }: CustomScrollbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Custom scrollbar and cursor styles */}
      <style jsx global>{`
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkTheme ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.3)'};
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDarkTheme 
            ? 'linear-gradient(45deg, rgb(147, 51, 234), rgb(79, 70, 229))' 
            : 'linear-gradient(45deg, rgb(6, 182, 212), rgb(59, 130, 246))'
          };
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkTheme 
            ? 'linear-gradient(45deg, rgb(167, 71, 254), rgb(99, 90, 249))' 
            : 'linear-gradient(45deg, rgb(34, 211, 238), rgb(96, 165, 250))'
          };
        }
        
        /* Custom scrollbar for Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkTheme 
            ? 'rgb(147, 51, 234) rgba(148, 163, 184, 0.1)' 
            : 'rgb(6, 182, 212) rgba(203, 213, 225, 0.3)'
          };
        }
        
        /* Custom cursors for different elements */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="${isDarkTheme ? '%239333ea' : '%2306b6d4'}" opacity="0.8"/><circle cx="10" cy="10" r="2" fill="white"/></svg>') 10 10, auto;
        }
        
        button, a, [role="button"] {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="${isDarkTheme ? '%23a855f7' : '%2322d3ee'}" opacity="0.9"/><circle cx="10" cy="10" r="3" fill="white"/></svg>') 10 10, pointer;
        }
        
        input, textarea, [contenteditable="true"] {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="${isDarkTheme ? '%23fbbf24' : '%23f59e0b'}" opacity="0.8"/><line x1="7" y1="10" x2="13" y2="10" stroke="white" stroke-width="2"/></svg>') 10 10, text;
        }
        
        /* Hover effects for interactive elements */
        button:hover, a:hover, [role="button"]:hover {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${isDarkTheme ? '%23c084fc' : '%236ee7b7'}" opacity="0.9"/><circle cx="12" cy="12" r="4" fill="white"/></svg>') 12 12, pointer;
        }
        
        /* Loading cursor */
        .loading {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="${isDarkTheme ? '%23fbbf24' : '%23f59e0b'}" stroke-width="2" opacity="0.8"/><circle cx="10" cy="10" r="3" fill="${isDarkTheme ? '%23fbbf24' : '%23f59e0b'}" opacity="0.6"/></svg>') 10 10, wait;
        }
        
        /* Not allowed cursor */
        .not-allowed {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="${isDarkTheme ? '%23ef4444' : '%23dc2626'}" opacity="0.8"/><line x1="7" y1="7" x2="13" y2="13" stroke="white" stroke-width="2"/><line x1="13" y1="7" x2="7" y2="13" stroke="white" stroke-width="2"/></svg>') 10 10, not-allowed;
        }
      `}</style>

      {/* Scroll progress indicator */}
      <div className={`fixed top-0 right-0 w-0.5 h-full z-50 pointer-events-none ${isDarkTheme ? 'bg-slate-900/20' : 'bg-white/20'}`}>
        <div 
          className={`w-full transition-all duration-300 ${
            isDarkTheme 
              ? 'bg-gradient-to-b from-purple-500 to-indigo-600' 
              : 'bg-gradient-to-b from-cyan-500 to-blue-600'
          }`}
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <div className={className}>
        {children}
      </div>
    </>
  )
}
