import { NextRequest, NextResponse } from 'next/server'

// Mock transporter data - replace with actual DB queries
const transporters = [
  {
    id: 1,
    name: 'Fast Logistics',
    routeFrom: 'Mumbai',
    routeTo: 'Pune',
    vehicle: 'Truck',
    pricePerKm: 15,
    phone: '9123456780',
    rating: 4.5,
    hasSubsidy: true
  },
  {
    id: 2,
    name: 'Green Transport',
    routeFrom: 'Nashik',
    routeTo: 'Mumbai',
    vehicle: 'Mini Truck',
    pricePerKm: 12,
    phone: '9123456781',
    rating: 4.8,
    hasSubsidy: false
  },
  {
    id: 3,
    name: 'Swift Cargo',
    routeFrom: 'Aurangabad',
    routeTo: 'Delhi',
    vehicle: 'Container',
    pricePerKm: 20,
    phone: '9123456782',
    rating: 4.3,
    hasSubsidy: true
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(transporters)
  } catch (error) {
    console.error('[v0] Get transporters error:', error)
    return NextResponse.json({ error: 'Failed to fetch transporters' }, { status: 500 })
  }
}
