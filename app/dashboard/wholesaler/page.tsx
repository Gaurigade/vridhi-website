'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatButton } from '@/components/chat-button'

const products = [
  {
    id: 1,
    name: 'Traditional Himroo Shawl',
    seller: 'Arjun Mehta',
    sellerId: 1,
    sellerPhone: '9876543210',
    location: 'Aurangabad',
    quantity: '50 pieces',
    price: '₹2500/piece',
    image: '/himroo-shawl.jpg',
    rating: 4.8,
    productType: 'Himroo Shawl'
  },
  {
    id: 101,
    name: 'Premium Himroo Shawl Deluxe',
    seller: 'Ravi Patel',
    sellerId: 101,
    sellerPhone: '9876543220',
    location: 'Aurangabad',
    quantity: '30 pieces',
    price: '₹3200/piece',
    image: '/himroo-shawl.jpg',
    rating: 4.9,
    productType: 'Himroo Shawl'
  },
  {
    id: 102,
    name: 'Handwoven Himroo Textile',
    seller: 'Neha Sharma',
    sellerId: 102,
    sellerPhone: '9876543221',
    location: 'Aurangabad',
    quantity: '25 pieces',
    price: '₹2800/piece',
    image: '/himroo-shawl.jpg',
    rating: 4.7,
    productType: 'Himroo Shawl'
  },
  {
    id: 103,
    name: 'Traditional Silk Himroo',
    seller: 'Vikram Singh',
    sellerId: 103,
    sellerPhone: '9876543222',
    location: 'Aurangabad',
    quantity: '40 pieces',
    price: '₹2900/piece',
    image: '/himroo-shawl.jpg',
    rating: 4.6,
    productType: 'Himroo Shawl'
  },
  {
    id: 104,
    name: 'Artisan Himroo Collection',
    seller: 'Suresh Kumar',
    sellerId: 104,
    sellerPhone: '9876543223',
    location: 'Aurangabad',
    quantity: '35 pieces',
    price: '₹3100/piece',
    image: '/himroo-shawl.jpg',
    rating: 4.8,
    productType: 'Himroo Shawl'
  },
  {
    id: 2,
    name: 'Fresh Red Tomatoes',
    seller: 'Priya Sharma',
    sellerId: 2,
    sellerPhone: '9876543211',
    location: 'Nashik',
    quantity: '500 kg',
    price: '₹25/kg',
    image: '/tomato.jpg',
    rating: 4.6,
    productType: 'Tomato'
  },
  {
    id: 201,
    name: 'Organic Tomatoes Farm Fresh',
    seller: 'Deepak Nair',
    sellerId: 201,
    sellerPhone: '9876543224',
    location: 'Nashik',
    quantity: '600 kg',
    price: '₹28/kg',
    image: '/tomato.jpg',
    rating: 4.7,
    productType: 'Tomato'
  },
  {
    id: 202,
    name: 'Premium Cherry Tomatoes',
    seller: 'Anita Verma',
    sellerId: 202,
    sellerPhone: '9876543225',
    location: 'Nashik',
    quantity: '300 kg',
    price: '₹35/kg',
    image: '/tomato.jpg',
    rating: 4.8,
    productType: 'Tomato'
  },
  {
    id: 203,
    name: 'Hydroponic Tomatoes',
    seller: 'Rajesh Gupta',
    sellerId: 203,
    sellerPhone: '9876543226',
    location: 'Nashik',
    quantity: '400 kg',
    price: '₹30/kg',
    image: '/tomato.jpg',
    rating: 4.9,
    productType: 'Tomato'
  },
  {
    id: 204,
    name: 'Beefsteak Tomatoes Premium',
    seller: 'Monica Singh',
    sellerId: 204,
    sellerPhone: '9876543227',
    location: 'Nashik',
    quantity: '350 kg',
    price: '₹32/kg',
    image: '/tomato.jpg',
    rating: 4.5,
    productType: 'Tomato'
  },
  {
    id: 3,
    name: 'Red Onion Premium',
    seller: 'Rajesh Kumar',
    sellerId: 3,
    sellerPhone: '9876543212',
    location: 'Pune',
    quantity: '1000 kg',
    price: '₹30/kg',
    image: '/onion.jpg',
    rating: 4.7,
    productType: 'Onion'
  },
  {
    id: 301,
    name: 'White Onions Fresh Stock',
    seller: 'Akshay Patel',
    sellerId: 301,
    sellerPhone: '9876543228',
    location: 'Pune',
    quantity: '800 kg',
    price: '₹28/kg',
    image: '/onion.jpg',
    rating: 4.8,
    productType: 'Onion'
  },
  {
    id: 302,
    name: 'Organic Onions Bulk',
    seller: 'Seema Wagh',
    sellerId: 302,
    sellerPhone: '9876543229',
    location: 'Pune',
    quantity: '1200 kg',
    price: '₹26/kg',
    image: '/onion.jpg',
    rating: 4.6,
    productType: 'Onion'
  },
  {
    id: 303,
    name: 'Sweet Spanish Onions',
    seller: 'Manish Desai',
    sellerId: 303,
    sellerPhone: '9876543230',
    location: 'Pune',
    quantity: '600 kg',
    price: '₹32/kg',
    image: '/onion.jpg',
    rating: 4.9,
    productType: 'Onion'
  },
  {
    id: 304,
    name: 'Red Pearl Onions Premium',
    seller: 'Ananya Singh',
    sellerId: 304,
    sellerPhone: '9876543231',
    location: 'Pune',
    quantity: '700 kg',
    price: '₹29/kg',
    image: '/onion.jpg',
    rating: 4.7,
    productType: 'Onion'
  },
  {
    id: 4,
    name: 'Fresh Turmeric Root',
    seller: 'Sunita Patel',
    sellerId: 4,
    sellerPhone: '9876543213',
    location: 'Salem',
    quantity: '200 kg',
    price: '₹80/kg',
    image: '/turmeric.jpg',
    rating: 4.9,
    productType: 'Turmeric'
  },
  {
    id: 401,
    name: 'Turmeric Powder Pure',
    seller: 'Mahesh Rao',
    sellerId: 401,
    sellerPhone: '9876543232',
    location: 'Salem',
    quantity: '150 kg',
    price: '₹90/kg',
    image: '/turmeric.jpg',
    rating: 4.8,
    productType: 'Turmeric'
  },
  {
    id: 402,
    name: 'Organic Curcumin Turmeric',
    seller: 'Lakshmi Devi',
    sellerId: 402,
    sellerPhone: '9876543233',
    location: 'Salem',
    quantity: '100 kg',
    price: '₹95/kg',
    image: '/turmeric.jpg',
    rating: 4.9,
    productType: 'Turmeric'
  },
  {
    id: 403,
    name: 'Fresh Turmeric Rhizomes',
    seller: 'Bhaskar Dutt',
    sellerId: 403,
    sellerPhone: '9876543234',
    location: 'Salem',
    quantity: '180 kg',
    price: '₹75/kg',
    image: '/turmeric.jpg',
    rating: 4.7,
    productType: 'Turmeric'
  },
  {
    id: 404,
    name: 'Premium Aged Turmeric',
    seller: 'Priya Reddy',
    sellerId: 404,
    sellerPhone: '9876543235',
    location: 'Salem',
    quantity: '120 kg',
    price: '₹88/kg',
    image: '/turmeric.jpg',
    rating: 4.8,
    productType: 'Turmeric'
  },
]

export default function WholesalerDashboard() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [chatOpen, setChatOpen] = useState(false)
  const [currentChat, setCurrentChat] = useState<any>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterCategory === 'all' ||
      product.productType.toLowerCase().includes(filterCategory)
    return matchesSearch && matchesFilter
  })

  const handleOpenChat = async (product: any) => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      alert('Please log in first')
      return
    }

    const user = JSON.parse(userData)

    // Create or get chat
    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participant1Id: user.id,
        participant2Id: product.sellerId
      })
    })

    const chat = await response.json()
    setCurrentChat({ ...chat, sellerName: product.seller, productName: product.name })
    setChatOpen(true)
  }

  const ChatWindow = ({ chatId }: { chatId: number }) => {
    // Placeholder for ChatWindow component
    return <div>ChatWindow Component for chatId: {chatId}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-700">VRIDHI</h1>
              <p className="text-sm text-gray-600">Wholesaler Dashboard</p>
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
        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="🔍 Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('all')}
              >
                All
              </Button>
              <Button
                variant={filterCategory === 'himroo' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('himroo')}
              >
                🧣 Himroo
              </Button>
              <Button
                variant={filterCategory === 'tomato' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('tomato')}
              >
                🍅 Tomato
              </Button>
              <Button
                variant={filterCategory === 'onion' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('onion')}
              >
                🧅 Onion
              </Button>
              <Button
                variant={filterCategory === 'turmeric' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('turmeric')}
              >
                🟨 Turmeric
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all rounded-xl border-b-4 border-b-blue-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">👤 Seller:</span>
                  <span className="font-semibold">{product.seller}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">📍 Location:</span>
                  <span className="font-semibold">{product.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">📦 Available:</span>
                  <span className="font-semibold">{product.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">💰 Price:</span>
                  <span className="font-semibold text-green-600">
                    {product.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">⭐ Rating:</span>
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `tel:${product.sellerPhone}`
                  }}
                >
                  📞 Call
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenChat(product)
                  }}
                >
                  💬 Chat
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <Card
            className="max-w-2xl w-full bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>
            <img
              src={selectedProduct.image || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Seller:</span>
                <span className="font-semibold">{selectedProduct.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{selectedProduct.sellerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">
                  {selectedProduct.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Quantity:</span>
                <span className="font-semibold">
                  {selectedProduct.quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-green-600 text-xl">
                  {selectedProduct.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold">
                  ⭐ {selectedProduct.rating}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = `tel:${selectedProduct.sellerPhone}`}
              >
                📞 Call Seller
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setSelectedProduct(null)
                  handleOpenChat(selectedProduct)
                }}
              >
                💬 Chat with Seller
              </Button>
            </div>
          </Card>
        </div>
      )}

      {chatOpen && currentChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full h-[600px] bg-white flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">Chat with {currentChat.sellerName}</h3>
                <p className="text-xs text-gray-500">About: {currentChat.productName}</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>
            
            <ChatWindow chatId={currentChat.id} />
          </Card>
        </div>
      )}

      <ChatButton />
    </div>
  )
}
