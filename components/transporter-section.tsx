'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const transporters = [
  {
    id: 1,
    name: 'Fast Transport Services',
    contact: '+91 98765 43210',
    vehicleType: 'Truck',
    capacity: '10 Tons',
    pricePerKm: '₹15',
    rating: 4.5,
    location: 'Mumbai'
  },
  {
    id: 2,
    name: 'Green Logistics',
    contact: '+91 98765 43211',
    vehicleType: 'Mini Truck',
    capacity: '5 Tons',
    pricePerKm: '₹12',
    rating: 4.8,
    location: 'Pune'
  },
  {
    id: 3,
    name: 'Swift Cargo',
    contact: '+91 98765 43212',
    vehicleType: 'Truck',
    capacity: '15 Tons',
    pricePerKm: '₹18',
    rating: 4.3,
    location: 'Nashik'
  },
  {
    id: 4,
    name: 'Reliable Movers',
    contact: '+91 98765 43213',
    vehicleType: 'Tempo',
    capacity: '3 Tons',
    pricePerKm: '₹10',
    rating: 4.6,
    location: 'Aurangabad'
  },
  {
    id: 5,
    name: 'Express Wheels Co.',
    contact: '+91 98765 43214',
    vehicleType: 'Truck',
    capacity: '12 Tons',
    pricePerKm: '₹16',
    rating: 4.7,
    location: 'Kolhapur'
  },
  {
    id: 6,
    name: 'Safe Transit Solutions',
    contact: '+91 98765 43215',
    vehicleType: 'Container',
    capacity: '20 Tons',
    pricePerKm: '₹22',
    rating: 4.9,
    location: 'Belgaum'
  },
  {
    id: 7,
    name: 'Quick Delivery Services',
    contact: '+91 98765 43216',
    vehicleType: 'Mini Truck',
    capacity: '6 Tons',
    pricePerKm: '₹13',
    rating: 4.4,
    location: 'Solapur'
  },
  {
    id: 8,
    name: 'Eco-Friendly Transport',
    contact: '+91 98765 43217',
    vehicleType: 'Truck',
    capacity: '8 Tons',
    pricePerKm: '₹14',
    rating: 4.8,
    location: 'Sangli'
  },
  {
    id: 9,
    name: 'Premium Logistics Group',
    contact: '+91 98765 43218',
    vehicleType: 'Truck',
    capacity: '18 Tons',
    pricePerKm: '₹20',
    rating: 4.6,
    location: 'Ratnagiri'
  },
  {
    id: 10,
    name: 'Nation Wide Cargo',
    contact: '+91 98765 43219',
    vehicleType: 'Tempo Traveller',
    capacity: '2.5 Tons',
    pricePerKm: '₹11',
    rating: 4.5,
    location: 'Satara'
  },
  {
    id: 11,
    name: 'TrustWorthy Logistics',
    contact: '+91 87654 32101',
    vehicleType: 'Truck',
    capacity: '14 Tons',
    pricePerKm: '₹17',
    rating: 4.7,
    location: 'Ahmednagar'
  },
  {
    id: 12,
    name: 'Speed Express Transport',
    contact: '+91 87654 32102',
    vehicleType: 'Mini Truck',
    capacity: '7 Tons',
    pricePerKm: '₹13',
    rating: 4.5,
    location: 'Jalgaon'
  },
  {
    id: 13,
    name: 'Rural Connect Cargo',
    contact: '+91 87654 32103',
    vehicleType: 'Truck',
    capacity: '9 Tons',
    pricePerKm: '₹15',
    rating: 4.6,
    location: 'Latur'
  },
  {
    id: 14,
    name: 'AgriFreight Solutions',
    contact: '+91 87654 32104',
    vehicleType: 'Container',
    capacity: '25 Tons',
    pricePerKm: '₹24',
    rating: 4.8,
    location: 'Nanded'
  },
  {
    id: 15,
    name: 'Urban Movers Pro',
    contact: '+91 87654 32105',
    vehicleType: 'Tempo',
    capacity: '4 Tons',
    pricePerKm: '₹11',
    rating: 4.4,
    location: 'Hingoli'
  },
]

export function TransporterSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🚚 Transporters</h2>
        <p className="text-gray-600">Find reliable transporters for your products ({transporters.length} available)</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transporters.map((transporter) => (
          <Card key={transporter.id} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow rounded-xl border-l-4 border-l-purple-400">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{transporter.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">📍 {transporter.location}</p>
              </div>
              <span className="flex items-center gap-1 text-sm font-bold">⭐ {transporter.rating}</span>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-semibold">{transporter.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capacity:</span>
                <span className="font-semibold">{transporter.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price/km:</span>
                <span className="font-semibold text-green-600">{transporter.pricePerKm}</span>
              </div>
            </div>

            <Button 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(`tel:${transporter.contact}`)}
            >
              📞 {transporter.contact}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
