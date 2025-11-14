'use client'

import { useState, useEffect } from 'react'
import { SellerSidebar } from '@/components/seller-sidebar'
import { SellerOverview } from '@/components/seller-overview'
import { RecordSales } from '@/components/record-sales'
import { ProductListings } from '@/components/product-listings'
import { TransporterSection } from '@/components/transporter-section'
import { ChatButton } from '@/components/chat-button'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    
    if (userData && !hasSeenOnboarding) {
      const user = JSON.parse(userData)
      // Check if user is newly registered
      const registeredDate = new Date(user.createdAt)
      const now = new Date()
      const diffMinutes = (now.getTime() - registeredDate.getTime()) / 1000 / 60
      
      if (diffMinutes < 5) {
        setShowOnboarding(true)
      }
    }
  }, [])

  const closeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-6">
        {activeTab === 'overview' && <SellerOverview />}
        {activeTab === 'record-sales' && <RecordSales />}
        {activeTab === 'products' && <ProductListings />}
        {activeTab === 'transporters' && <TransporterSection />}
      </div>

      <ChatButton />

      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-8 bg-white">
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to VRIDHI!
              </h2>
              <p className="text-gray-600 mb-6">
                Let's get you started with your seller dashboard
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">📦</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Add Your First Product</h3>
                  <p className="text-xs text-gray-600">List products you want to sell</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">💰</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Record a Sale</h3>
                  <p className="text-xs text-gray-600">Track your sales and see insights</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">View Analytics</h3>
                  <p className="text-xs text-gray-600">Get price forecasts and market data</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  closeOnboarding()
                  setActiveTab('record-sales')
                }}
                className="flex-1 bg-green-600"
              >
                Record First Sale
              </Button>
              <Button
                onClick={closeOnboarding}
                variant="outline"
                className="flex-1"
              >
                Explore Dashboard
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
