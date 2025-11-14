'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { mutate } from 'swr'

const PRODUCT_OPTIONS = ['Himroo Shawl', 'Tomato', 'Onion', 'Turmeric', 'Other']

export function RecordSales() {
  const [user, setUser] = useState<any>(null)
  const [userSales, setUserSales] = useState<any[]>([])
  const [formData, setFormData] = useState({
    productType: '',
    qty: '',
    unitPrice: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    const saved = localStorage.getItem('userSalesRecords')
    if (saved) {
      setUserSales(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    if (!formData.productType || !formData.qty || !formData.unitPrice) {
      alert('Please fill in all fields')
      return
    }

    const newSale = {
      id: Date.now(),
      productType: formData.productType,
      qty: parseFloat(formData.qty),
      unitPrice: parseFloat(formData.unitPrice),
      totalPrice: parseFloat(formData.qty) * parseFloat(formData.unitPrice),
      date: formData.date
    }

    const updatedSales = [newSale, ...userSales]
    setUserSales(updatedSales)
    localStorage.setItem('userSalesRecords', JSON.stringify(updatedSales))

    setSuccess(true)
    setFormData({
      productType: '',
      qty: '',
      unitPrice: '',
      date: new Date().toISOString().split('T')[0]
    })
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">💰 Record a Sale</h2>
        <p className="text-gray-600">Add a new sale transaction</p>
      </div>

      <Card className="p-8 bg-white/70 backdrop-blur-sm max-w-2xl rounded-xl shadow-md border-t-4 border-t-blue-400">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="productType">Product *</Label>
            <select
              id="productType"
              value={formData.productType}
              onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white font-medium"
              required
            >
              <option value="">Select product</option>
              {PRODUCT_OPTIONS.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="qty">Quantity (kg) *</Label>
              <Input
                id="qty"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.qty}
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price (₹) *</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date">Sale Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {formData.qty && formData.unitPrice && (
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{(parseFloat(formData.qty) * parseFloat(formData.unitPrice)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                ✅ Sale recorded successfully!
              </p>
            </div>
          )}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 font-medium">
            Record Sale
          </Button>
        </form>
      </Card>

      {userSales.length === 0 ? (
        <Card className="p-12 bg-white/70 backdrop-blur-sm text-center rounded-xl shadow-md">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Sales Recorded Yet</h3>
          <p className="text-gray-600">Start by recording your first sale above</p>
        </Card>
      ) : (
        <Card className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Your Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-3 font-bold">Date</th>
                  <th className="text-left p-3 font-bold">Product</th>
                  <th className="text-right p-3 font-bold">Quantity</th>
                  <th className="text-right p-3 font-bold">Price/kg</th>
                  <th className="text-right p-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {userSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold">{sale.productType}</td>
                    <td className="text-right p-3">{sale.qty} kg</td>
                    <td className="text-right p-3">₹{sale.unitPrice.toFixed(2)}</td>
                    <td className="text-right p-3 font-bold text-green-600">₹{sale.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
