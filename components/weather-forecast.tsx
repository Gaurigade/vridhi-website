'use client'

import { Card } from '@/components/ui/card'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function WeatherForecast({ location }: { location: string }) {
  const { data, error } = useSWR(`/api/weather/${encodeURIComponent(location)}`, fetcher)

  if (!data) return <div>Loading weather...</div>

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">15-DAY WEATHER FORECAST</h3>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
        {data.isDemo && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
            DEMO DATA
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {data.forecast.map((day: any, i: number) => (
            <div key={i} className="flex flex-col items-center p-3 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-gray-200 min-w-[80px]">
              <div className="text-xs font-semibold text-gray-600 mb-1">
                Day {day.day}
              </div>
              <div className="text-3xl mb-2">{day.icon}</div>
              <div className="text-xs text-gray-500 mb-1">{day.condition}</div>
              <div className="flex gap-1 text-xs">
                <span className="text-blue-600 font-semibold">{day.minTemp}°</span>
                <span className="text-gray-400">/</span>
                <span className="text-red-600 font-semibold">{day.maxTemp}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
