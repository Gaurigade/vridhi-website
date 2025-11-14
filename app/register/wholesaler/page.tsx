'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const PRODUCT_OPTIONS = [
  { value: 'Himroo Shawl', label: 'Himroo Shawl', icon: '🧣' },
  { value: 'Tomato', label: 'Tomato', icon: '🍅' },
  { value: 'Onion', label: 'Onion', icon: '🧅' },
  { value: 'Turmeric', label: 'Turmeric', icon: '🌿' },
  { value: 'Other', label: 'Other', icon: '📦' },
]

export default function WholesalerRegistration() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    productType: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone must be exactly 10 digits')
      return
    }

    if (!/^[a-zA-Z0-9]{8,}$/.test(formData.password)) {
      setError('Password must be at least 8 characters with letters and numbers only (no special characters)')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.productType) {
      setError('Please select a product type')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          role: 'wholesaler',
          productType: formData.productType
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/dashboard/wholesaler')

    } catch (err) {
      setError('Registration failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Wholesaler Registration
            </h1>
            <p className="text-gray-600">Join VRIDHI as a Wholesaler</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
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
              />
              <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
            </div>

            <div>
              <Label htmlFor="productType">Product Interest *</Label>
              <select
                id="productType"
                value={formData.productType}
                onChange={(e) =>
                  setFormData({ ...formData, productType: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                required
              >
                <option value="">Select product of interest</option>
                {PRODUCT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, letters and numbers only (no special characters)
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Registering...' : 'Register as Wholesaler'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline"
            >
              Already have an account? Log in
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
