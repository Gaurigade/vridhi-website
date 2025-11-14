'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect based on role
      if (data.user.role === 'seller') {
        router.push('/dashboard/seller')
      } else if (data.user.role === 'wholesaler') {
        router.push('/dashboard/wholesaler')
      } else {
        router.push('/dashboard/visitor')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back to VRIDHI
          </h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="10 digit phone number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                setFormData({ ...formData, phone: value })
              }}
              pattern="\d{10}"
              maxLength={10}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mt-1"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </Card>
    </div>
  )
}
