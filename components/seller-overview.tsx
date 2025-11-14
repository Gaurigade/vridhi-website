'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useSWR, { mutate } from 'swr'
import { PriceGraphs } from '@/components/price-graphs'
import { WeatherForecast } from '@/components/weather-forecast'
import { IntelligenceHub } from '@/components/intelligence-hub'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const priceData = [
  { month: 'Jan', rice: 45, wheat: 38, vegetables: 25 },
  { month: 'Feb', rice: 48, wheat: 40, vegetables: 28 },
  { month: 'Mar', rice: 52, wheat: 42, vegetables: 30 },
  { month: 'Apr', rice: 50, wheat: 41, vegetables: 32 },
  { month: 'May', rice: 55, wheat: 45, vegetables: 35 },
  { month: 'Jun', rice: 58, wheat: 47, vegetables: 38 },
]

const demandDataByProduct: { [key: string]: any[] } = {
  'Onion': [
    { date: '1', demand: 75 },
    { date: '5', demand: 82 },
    { date: '10', demand: 88 },
    { date: '15', demand: 85 },
    { date: '20', demand: 92 },
    { date: '25', demand: 95 },
    { date: '30', demand: 90 },
  ],
  'Tomato': [
    { date: '1', demand: 70 },
    { date: '5', demand: 78 },
    { date: '10', demand: 82 },
    { date: '15', demand: 80 },
    { date: '20', demand: 88 },
    { date: '25', demand: 91 },
    { date: '30', demand: 85 },
  ],
  'Turmeric': [
    { date: '1', demand: 60 },
    { date: '5', demand: 65 },
    { date: '10', demand: 72 },
    { date: '15', demand: 75 },
    { date: '20', demand: 80 },
    { date: '25', demand: 78 },
    { date: '30', demand: 82 },
  ],
  'Himroo Shawl': [
    { date: '1', demand: 45 },
    { date: '5', demand: 52 },
    { date: '10', demand: 58 },
    { date: '15', demand: 62 },
    { date: '20', demand: 65 },
    { date: '25', demand: 70 },
    { date: '30', demand: 68 },
  ],
}

export function SellerOverview() {
  const [user, setUser] = useState<any>(null)
  const [editingSale, setEditingSale] = useState<any>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [selectedProduct, setSelectedProduct] = useState('Onion') // Add product selection state

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const { data: sales = [], error } = useSWR(
    user ? `/api/sales?sellerId=${user.id}` : null,
    fetcher,
    { refreshInterval: 3000 }
  )

  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum: number, sale: any) => sum + sale.totalPrice, 0)
  const avgPrice = sales.length > 0 ? totalRevenue / sales.reduce((sum: number, s: any) => sum + s.qty, 0) : 0

  const handleEdit = (sale: any) => {
    setEditingSale(sale)
    setEditForm({
      productType: sale.productType,
      qty: sale.qty,
      unitPrice: sale.unitPrice,
      buyer: sale.buyer,
      date: sale.date
    })
  }

  const handleSaveEdit = async () => {
    if (!editingSale) return
    try {
      const response = await fetch(`/api/sales/${editingSale.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      if (response.ok) {
        mutate(`/api/sales?sellerId=${user.id}`)
        setEditingSale(null)
        alert('Sale updated successfully!')
      }
    } catch (error) {
      console.error('[v0] Update sale error:', error)
      alert('Failed to update sale')
    }
  }

  const selectedDemandData = demandDataByProduct[selectedProduct] || demandDataByProduct['Onion']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Here's your farm overview</p>
      </div>

      <Card className="p-6 bg-white/70 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">SALES RECORDS</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-2 font-bold">Date</th>
                <th className="text-left py-3 px-2 font-bold">Product</th>
                <th className="text-right py-3 px-2 font-bold">Quantity</th>
                <th className="text-right py-3 px-2 font-bold">Unit Price</th>
                <th className="text-right py-3 px-2 font-bold">Total</th>
                <th className="text-left py-3 px-2 font-bold">Buyer</th>
                <th className="text-center py-3 px-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No sales recorded yet. Add your first sale to get started!
                  </td>
                </tr>
              ) : (
                sales.map((sale: any) => (
                  <tr key={sale.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-2">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="py-3 px-2">{sale.productType}</td>
                    <td className="py-3 px-2 text-right">{sale.qty} kg</td>
                    <td className="py-3 px-2 text-right">₹{sale.unitPrice.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right font-semibold">₹{sale.totalPrice.toFixed(2)}</td>
                    <td className="py-3 px-2">{sale.buyer || '-'}</td>
                    <td className="py-3 px-2 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(sale)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="text-sm text-gray-600 mb-1">Total Sales</div>
          <div className="text-2xl font-bold text-green-600">{totalSales}</div>
          <div className="text-xs text-gray-500 mt-1">Transactions</div>
        </Card>
        
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-blue-600">₹{totalRevenue.toFixed(0)}</div>
          <div className="text-xs text-gray-500 mt-1">From all sales</div>
        </Card>
        
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="text-sm text-gray-600 mb-1">Average Price</div>
          <div className="text-2xl font-bold text-purple-600">₹{avgPrice.toFixed(2)}</div>
          <div className="text-xs text-gray-500 mt-1">Per kg</div>
        </Card>
        
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="text-sm text-gray-600 mb-1">Transactions</div>
          <div className="text-2xl font-bold text-orange-600">{totalSales}</div>
          <div className="text-xs text-gray-500 mt-1">Total count</div>
        </Card>
      </div>

      {/* Dynamic Product Demand Graph replaces old graph */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Weather Forecast</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">☀️</div>
                <div>
                  <div className="font-semibold">Today</div>
                  <div className="text-sm text-gray-600">Sunny, 28°C</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⛅</div>
                <div>
                  <div className="font-semibold">Tomorrow</div>
                  <div className="text-sm text-gray-600">Partly Cloudy, 26°C</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌧️</div>
                <div>
                  <div className="font-semibold">Day After</div>
                  <div className="text-sm text-gray-600">Rain Expected, 24°C</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border-l-4 border-l-blue-400">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📊 {selectedProduct} - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg bg-white font-medium hover:border-blue-400 transition-colors"
            >
              <option>Onion</option>
              <option>Tomato</option>
              <option>Turmeric</option>
              <option>Himroo Shawl</option>
            </select>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Product Demand - {selectedProduct}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={selectedDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {user?.productType && (
        <>
          <div className="pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              PRICE TRENDS - {user.productType.toUpperCase()}
            </h2>
            <PriceGraphs productType={user.productType} />
          </div>

          <div className="pt-4">
            <WeatherForecast location={user.city || 'India'} />
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">INTELLIGENCE HUB</h2>
            <IntelligenceHub productType={user.productType} />
          </div>
        </>
      )}

      {editingSale && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6 bg-white">
            <h3 className="text-xl font-bold mb-4">Edit Sale</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <input
                  type="text"
                  value={editForm.productType}
                  onChange={(e) => setEditForm({ ...editForm, productType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={editForm.qty}
                  onChange={(e) => setEditForm({ ...editForm, qty: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Unit Price (₹)</label>
                <input
                  type="number"
                  value={editForm.unitPrice}
                  onChange={(e) => setEditForm({ ...editForm, unitPrice: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Buyer</label>
                <input
                  type="text"
                  value={editForm.buyer}
                  onChange={(e) => setEditForm({ ...editForm, buyer: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveEdit} className="flex-1 bg-green-600">
                  Confirm Edit
                </Button>
                <Button onClick={() => setEditingSale(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
