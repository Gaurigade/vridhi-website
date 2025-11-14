'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: '#F4F8F6' }}>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold" style={{ color: '#0B8457' }}>
                VRIDHI
              </div>
              <div className="text-sm text-gray-600">
                Agricultural Marketplace
              </div>
            </div>
            <Button
              onClick={() => router.push('/login')}
              className="bg-[#0B8457] hover:bg-[#085d3d] text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#0F1724' }}>VRIDHI</h1>
          <p className="text-xl text-gray-600">
            Connecting Farmers, Wholesalers, and Visitors
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all hover:border-[#0B8457]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#0B8457' }}>
                I'M A SELLER
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with wholesalers and manage your produce
              </p>
              <Button
                onClick={() => router.push('/register/seller')}
                className="w-full bg-[#0B8457] hover:bg-[#085d3d] text-white"
              >
                Get Started
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-sm border-2 hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                I'm a Wholesaler
              </h2>
              <p className="text-gray-600 mb-6">
                Find quality produce from verified sellers
              </p>
              <Button
                onClick={() => router.push('/register/wholesaler')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-sm border-2 hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                I'm a Visitor
              </h2>
              <p className="text-gray-600 mb-6">
                Explore market trends and insights
              </p>
              <Button
                onClick={() => router.push('/register/visitor')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
