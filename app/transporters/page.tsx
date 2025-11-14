'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const transporters = [
  {
    id: 1,
    name: 'Fast Transport Services',
    owner: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    email: 'fast@transport.com',
    vehicleType: 'Truck',
    capacity: '10 Tons',
    pricePerKm: '₹15',
    rating: 4.5,
    totalTrips: 245,
    location: 'Delhi',
  },
  {
    id: 2,
    name: 'Green Logistics',
    owner: 'Suresh Patel',
    contact: '+91 98765 43211',
    email: 'green@logistics.com',
    vehicleType: 'Mini Truck',
    capacity: '5 Tons',
    pricePerKm: '₹12',
    rating: 4.8,
    totalTrips: 380,
    location: 'Mumbai',
  },
  {
    id: 3,
    name: 'Swift Cargo',
    owner: 'Amit Singh',
    contact: '+91 98765 43212',
    email: 'swift@cargo.com',
    vehicleType: 'Truck',
    capacity: '15 Tons',
    pricePerKm: '₹18',
    rating: 4.3,
    totalTrips: 190,
    location: 'Bangalore',
  },
  {
    id: 4,
    name: 'Reliable Movers',
    owner: 'Prakash Reddy',
    contact: '+91 98765 43213',
    email: 'reliable@movers.com',
    vehicleType: 'Tempo',
    capacity: '3 Tons',
    pricePerKm: '₹10',
    rating: 4.6,
    totalTrips: 420,
    location: 'Hyderabad',
  },
  {
    id: 5,
    name: 'Express Wheels',
    owner: 'Vijay Sharma',
    contact: '+91 98765 43214',
    email: 'express@wheels.com',
    vehicleType: 'Truck',
    capacity: '12 Tons',
    pricePerKm: '₹16',
    rating: 4.7,
    totalTrips: 310,
    location: 'Pune',
  },
  {
    id: 6,
    name: 'Safe Transit Co.',
    owner: 'Mohan Verma',
    contact: '+91 98765 43215',
    email: 'safe@transit.com',
    vehicleType: 'Container Truck',
    capacity: '20 Tons',
    pricePerKm: '₹22',
    rating: 4.9,
    totalTrips: 156,
    location: 'Chennai',
  },
]

export default function TransportersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterVehicle, setFilterVehicle] = useState('all')

  const filteredTransporters = transporters.filter((transporter) => {
    const matchesSearch =
      transporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transporter.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterVehicle === 'all' || transporter.vehicleType === filterVehicle
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-orange-700">VRIDHI</h1>
              <p className="text-sm text-gray-600">Transporter Directory</p>
            </div>
            <Button onClick={() => router.push('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Find Transporters
          </h2>
          <p className="text-gray-600">
            Connect with reliable transport services for your goods
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterVehicle === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterVehicle('all')}
              >
                All
              </Button>
              <Button
                variant={filterVehicle === 'Truck' ? 'default' : 'outline'}
                onClick={() => setFilterVehicle('Truck')}
              >
                Truck
              </Button>
              <Button
                variant={filterVehicle === 'Mini Truck' ? 'default' : 'outline'}
                onClick={() => setFilterVehicle('Mini Truck')}
              >
                Mini Truck
              </Button>
              <Button
                variant={filterVehicle === 'Tempo' ? 'default' : 'outline'}
                onClick={() => setFilterVehicle('Tempo')}
              >
                Tempo
              </Button>
            </div>
          </div>
        </Card>

        {/* Transporter Table */}
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-4 font-bold">Transporter</th>
                  <th className="text-left p-4 font-bold">Owner</th>
                  <th className="text-left p-4 font-bold">Contact</th>
                  <th className="text-left p-4 font-bold">Vehicle</th>
                  <th className="text-left p-4 font-bold">Capacity</th>
                  <th className="text-left p-4 font-bold">Price/Km</th>
                  <th className="text-left p-4 font-bold">Rating</th>
                  <th className="text-left p-4 font-bold">Location</th>
                  <th className="text-left p-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransporters.map((transporter) => (
                  <tr
                    key={transporter.id}
                    className="border-b border-gray-200 hover:bg-orange-50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {transporter.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {transporter.totalTrips} trips completed
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">{transporter.owner}</td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="text-gray-700">{transporter.contact}</div>
                        <div className="text-gray-600">{transporter.email}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {transporter.vehicleType}
                    </td>
                    <td className="p-4 font-semibold text-gray-800">
                      {transporter.capacity}
                    </td>
                    <td className="p-4 text-orange-600 font-bold">
                      {transporter.pricePerKm}
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 font-semibold">
                        ⭐ {transporter.rating}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{transporter.location}</td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Contact
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">
              Total Transporters
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {transporters.length}
            </div>
          </Card>
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Average Rating</div>
            <div className="text-2xl font-bold text-green-600">4.6 ⭐</div>
          </Card>
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">
              Total Completed Trips
            </div>
            <div className="text-2xl font-bold text-blue-600">1,701</div>
          </Card>
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-sm text-gray-600 mb-1">Avg Price/Km</div>
            <div className="text-2xl font-bold text-purple-600">₹15.5</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
