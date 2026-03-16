'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (userid: string, password: string) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Login successful:', data)
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    }
  }

  return <Login onLogin={handleLogin} />
}
