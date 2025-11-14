'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DEFAULT_PRODUCT = 'Onion'

export function ProductListings() {
  const [formData, setFormData] = useState({
    farmAddress: '',
    farmSize: '',
    price: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('sellerProductSubmissions')
    if (saved) {
      setSubmissions(JSON.parse(saved))
    }
  }, [])

  const saveSubmissions = (newSubmissions: any[]) => {
    setSubmissions(newSubmissions)
    localStorage.setItem('sellerProductSubmissions', JSON.stringify(newSubmissions))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.farmAddress || !formData.farmSize || !formData.price) {
      alert('Please fill in all fields')
      return
    }

    const newSubmission = {
      id: Date.now(),
      product: DEFAULT_PRODUCT,
      ...formData,
      price: parseFloat(formData.price),
      farmSize: parseFloat(formData.farmSize),
      date: new Date().toISOString().split('T')[0]
    }

    saveSubmissions([...submissions, newSubmission])
    setFormData({ farmAddress: '', farmSize: '', price: '' })
    setShowForm(false)
  }

  const marketPrices: { [key: string]: number } = {
    'Onion': 45,
    'Tomato': 38,
    'Turmeric': 52,
    'Himroo Shawl': 250
  }

  const priceComparisonData = submissions.map(s => ({
    name: `${s.date}`,
    'Your Price': s.price,
    'Market Price': marketPrices[DEFAULT_PRODUCT] || 50
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🌱 My Products</h2>
          <p className="text-gray-600">Manage your {DEFAULT_PRODUCT} listings</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          {showForm ? 'Cancel' : '+ Add Your Own Product'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border-t-4 border-t-green-400">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add {DEFAULT_PRODUCT}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="farmAddress">Farm Address *</Label>
              <Input
                id="farmAddress"
                value={formData.farmAddress}
                onChange={(e) => setFormData({ ...formData, farmAddress: e.target.value })}
                placeholder="Your farm location"
                required
              />
            </div>

            <div>
              <Label htmlFor="farmSize">Farm Size (acres) *</Label>
              <Input
                id="farmSize"
                type="number"
                step="0.01"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                placeholder="e.g., 5"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price per kg (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Add Product
            </Button>
          </form>
        </Card>
      )}

      {submissions.length === 0 ? (
        <Card className="p-12 bg-white/70 backdrop-blur-sm text-center rounded-xl shadow-md">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Added Yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your {DEFAULT_PRODUCT} to your catalog</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Add Your First Product
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <Card key={submission.id} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow rounded-xl border-b-4 border-b-orange-300">
                <div className="text-4xl mb-3">🌾</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{DEFAULT_PRODUCT}</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">📍 Location:</span>
                    <span className="font-semibold">{submission.farmAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🏞️ Farm Size:</span>
                    <span className="font-semibold">{submission.farmSize} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">💰 Price:</span>
                    <span className="font-semibold text-green-600">₹{submission.price}/kg</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (confirm('Remove this product?')) {
                      saveSubmissions(submissions.filter(s => s.id !== submission.id))
                    }
                  }}
                >
                  Remove
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Your Price vs Market Price</h3>
            {priceComparisonData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Your Price" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Market Price" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">Add products to see price comparison</p>
            )}
          </Card>
        </>
      )}
    </div>
  )
}
