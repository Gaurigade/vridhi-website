'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function IntelligenceHub({ productType }: { productType: string }) {
  const { data: priceData } = useSWR(`/api/prices/${encodeURIComponent(productType)}`, fetcher)
  const { data: transporters } = useSWR('/api/transporters', fetcher)

  const getAISuggestion = () => {
    if (!priceData) return null

    const trend = priceData.future[6] > priceData.today ? 'increasing' : 'decreasing'
    const confidence = priceData.confidence

    if (trend === 'increasing' && confidence > 60) {
      return {
        text: `AI Suggestion: Hold 60% of stock for later sale; sell 40% today at ₹${priceData.today}/kg`,
        color: 'green'
      }
    } else if (trend === 'decreasing') {
      return {
        text: `AI Suggestion: Sell now at ₹${priceData.today}/kg before prices drop further`,
        color: 'orange'
      }
    } else {
      return {
        text: `AI Suggestion: Moderate selling recommended at current price ₹${priceData.today}/kg`,
        color: 'blue'
      }
    }
  }

  const subsidyTransporters = transporters?.filter((t: any) => t.hasSubsidy) || []

  const getPriceRange = () => {
    if (!priceData) return null

    const currentPrice = priceData.today
    const avgPast = priceData.past.reduce((a: number, b: number) => a + b, 0) / priceData.past.length
    const diff = ((currentPrice - avgPast) / avgPast) * 100

    if (diff > 5) return { status: 'good', color: 'green', text: 'Good selling price' }
    if (diff < -5) return { status: 'avoid', color: 'red', text: 'Price lower than average' }
    return { status: 'watch', color: 'yellow', text: 'Average market price' }
  }

  const aiSuggestion = getAISuggestion()
  const priceRange = getPriceRange()

  const tips: { [key: string]: string[] } = {
    'Himroo Shawl': [
      'Store in cool, dry place to prevent fabric damage',
      'Target luxury markets and exhibitions for better prices',
      'Maintain authenticity certificates for premium buyers'
    ],
    'Tomato': [
      'Harvest early morning for better shelf life',
      'Store at 55-60°F to prevent spoilage',
      'Target wholesale markets within 48 hours of harvest'
    ],
    'Onion': [
      'Cure onions for 2-3 weeks before storage',
      'Store in well-ventilated area with low humidity',
      'Ideal selling window is 3-6 months post-harvest'
    ],
    'Turmeric': [
      'Dry turmeric to 10-12% moisture content',
      'Store in airtight containers away from light',
      'Focus on spice markets and direct export channels'
    ]
  }

  const productTips = tips[productType] || ['Store properly', 'Sell at optimal time', 'Maintain quality']

  return (
    <div className="space-y-4">
      {aiSuggestion && (
        <Card className={`p-4 bg-${aiSuggestion.color}-50 border-2 border-${aiSuggestion.color}-200`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm mb-1">AI SUGGESTION</h4>
              <p className="text-sm text-gray-700">{aiSuggestion.text}</p>
              {priceData && (
                <p className="text-xs text-gray-500 mt-2">
                  Confidence: {priceData.confidence}% | Based on 7-day forecast analysis
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {subsidyTransporters.length > 0 && (
        <Card className="p-4 bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm mb-1">TRANSPORT SUBSIDY AVAILABLE</h4>
              <p className="text-sm text-gray-700 mb-2">
                Get ₹2/kg transport subsidy - {subsidyTransporters.length} eligible transporters available
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Contact FPO Manager
              </Button>
            </div>
          </div>
        </Card>
      )}

      {priceRange && (
        <Card className={`p-4 bg-${priceRange.color}-50 border-2 border-${priceRange.color}-200`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm mb-1">PRICE RANGE ALERT</h4>
              <p className="text-sm text-gray-700">
                Current: ₹{priceData?.today}/kg - {priceRange.text}
              </p>
              <div className={`mt-2 inline-block px-3 py-1 bg-${priceRange.color}-100 text-${priceRange.color}-700 text-xs font-bold rounded-full`}>
                {priceRange.status.toUpperCase()}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4 bg-purple-50 border-2 border-purple-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm mb-2">SELLING TIPS FOR {productType.toUpperCase()}</h4>
            <ul className="space-y-2">
              {productTips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
