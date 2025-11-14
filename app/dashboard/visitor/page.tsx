'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const marketData = [
  { month: 'Jan', rice: 45, wheat: 38, vegetables: 25, pulses: 70 },
  { month: 'Feb', rice: 48, wheat: 40, vegetables: 28, pulses: 72 },
  { month: 'Mar', rice: 52, wheat: 42, vegetables: 30, pulses: 75 },
  { month: 'Apr', rice: 50, wheat: 41, vegetables: 32, pulses: 73 },
  { month: 'May', rice: 55, wheat: 45, vegetables: 35, pulses: 78 },
  { month: 'Jun', rice: 58, wheat: 47, vegetables: 38, pulses: 80 },
]

const regionalData = [
  { region: 'North', production: 85 },
  { region: 'South', production: 70 },
  { region: 'East', production: 65 },
  { region: 'West', production: 75 },
  { region: 'Central', production: 60 },
]

export default function VisitorDashboard() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-purple-700">VRIDHI</h1>
              <p className="text-sm text-gray-600">Visitor Dashboard</p>
            </div>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Market Insights
          </h2>
          <p className="text-gray-600">
            Explore agriculture market trends and data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Total Sellers</div>
            <div className="text-2xl font-bold text-purple-600">1,245</div>
            <div className="text-xs text-gray-500 mt-1">+8% this month</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Active Listings</div>
            <div className="text-2xl font-bold text-blue-600">3,567</div>
            <div className="text-xs text-gray-500 mt-1">+15% this month</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Avg. Price (Rice)</div>
            <div className="text-2xl font-bold text-green-600">₹52/kg</div>
            <div className="text-xs text-gray-500 mt-1">+3% from last month</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Market Volume</div>
            <div className="text-2xl font-bold text-orange-600">₹45.6L</div>
            <div className="text-xs text-gray-500 mt-1">Daily average</div>
          </Card>
        </div>

        {/* Market Trends */}
        <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Market Price Trends
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rice"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="wheat"
                stroke="#f59e0b"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="vegetables"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pulses"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Regional Production */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Regional Production
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="production" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Market Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Rice Prices Up
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rice prices increased by 5% due to high demand in export
                      markets
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Good Harvest Season
                    </h4>
                    <p className="text-sm text-gray-600">
                      Wheat production expected to increase by 12% this season
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      New Technology
                    </h4>
                    <p className="text-sm text-gray-600">
                      Smart farming techniques showing 20% better yields
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Popular Products */}
        <Card className="p-6 mt-8 bg-white/70 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Popular Products
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-2">🌾</div>
                <h4 className="font-semibold">Rice</h4>
                <p className="text-sm text-gray-600">₹52/kg</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-2">🌿</div>
                <h4 className="font-semibold">Wheat</h4>
                <p className="text-sm text-gray-600">₹47/kg</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-2">🥬</div>
                <h4 className="font-semibold">Vegetables</h4>
                <p className="text-sm text-gray-600">₹38/kg</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-2">🫘</div>
                <h4 className="font-semibold">Pulses</h4>
                <p className="text-sm text-gray-600">₹80/kg</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
