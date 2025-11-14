import { NextRequest, NextResponse } from 'next/server'

// Mock forecast data - replace with actual DB queries
const forecastCache: any = {
  'Himroo Shawl': {
    past: [2400, 2450, 2500, 2480, 2520, 2550, 2580],
    today: 2580,
    future: [2600, 2620, 2650, 2680, 2700, 2720, 2750],
    dates: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    updatedAt: new Date().toISOString(),
    confidence: 75
  },
  'Tomato': {
    past: [22, 24, 25, 26, 25, 27, 28],
    today: 28,
    future: [29, 30, 32, 31, 33, 34, 35],
    dates: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    updatedAt: new Date().toISOString(),
    confidence: 68
  },
  'Onion': {
    past: [28, 29, 30, 31, 30, 32, 33],
    today: 33,
    future: [34, 35, 36, 37, 38, 39, 40],
    dates: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    updatedAt: new Date().toISOString(),
    confidence: 72
  },
  'Turmeric': {
    past: [75, 78, 80, 82, 81, 83, 85],
    today: 85,
    future: [86, 88, 90, 92, 94, 95, 97],
    dates: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    updatedAt: new Date().toISOString(),
    confidence: 80
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productType: string } }
) {
  try {
    const productType = decodeURIComponent(params.productType)
    const data = forecastCache[productType]

    if (!data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('[v0] Get prices error:', error)
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}
