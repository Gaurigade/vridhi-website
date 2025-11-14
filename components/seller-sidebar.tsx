'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface SellerSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function SellerSidebar({ activeTab, setActiveTab }: SellerSidebarProps) {
  const router = useRouter()

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'record-sales', label: 'Record Sales', icon: '💰' },
    { id: 'products', label: 'My Products', icon: '🌾' },
    { id: 'transporters', label: 'Transporters', icon: '🚚' },
  ]

  return (
    <div className="w-64 bg-white/70 backdrop-blur-sm border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#0B8457' }}>VRIDHI</h1>
        <p className="text-sm text-gray-600">Seller Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={activeTab === item.id ? { backgroundColor: '#0B8457' } : {}}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
