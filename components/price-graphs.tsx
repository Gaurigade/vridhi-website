'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function PriceGraphs({ productType }: { productType: string }) {
  const { data, error } = useSWR(`/api/prices/${encodeURIComponent(productType)}`, fetcher)

  if (!data) return <div>Loading price data...</div>

  const pastData = data.dates.map((day: string, i: number) => ({
    day,
    price: data.past[i]
  }))

  const futureData = data.dates.map((day: string, i: number) => ({
    day,
    price: data.future[i]
  }))

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          PAST 7 DAYS
        </h3>
        <p className="text-xs text-gray-500 mb-4">{productType} Price History</p>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" style={{ fontSize: 12 }} />
            <YAxis style={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="price" fill="#0B8457" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="price" position="top" style={{ fontSize: 14, fontWeight: 'bold' }} formatter={(value: number) => `₹${value}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 text-xs">
          <div className="grid grid-cols-7 gap-1 text-center">
            {pastData.map((item: any, i: number) => (
              <div key={i} className="p-1 bg-green-50 rounded">
                <div className="font-semibold">{item.day}</div>
                <div className="text-green-700">₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/70 backdrop-blur-sm border-2 border-purple-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-800">
            NEXT 7 DAYS FORECAST
          </h3>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
            AI FORECAST
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-4">Predicted {productType} Prices (Confidence: {data.confidence}%)</p>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={futureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" style={{ fontSize: 12 }} />
            <YAxis style={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="price" fill="#a78bfa" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="price" position="top" style={{ fontSize: 14, fontWeight: 'bold' }} formatter={(value: number) => `₹${value}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 text-xs">
          <div className="grid grid-cols-7 gap-1 text-center">
            {futureData.map((item: any, i: number) => (
              <div key={i} className="p-1 bg-purple-50 rounded">
                <div className="font-semibold">{item.day}</div>
                <div className="text-purple-700">₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
