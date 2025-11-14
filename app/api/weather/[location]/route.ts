import { NextRequest, NextResponse } from 'next/server'

// Demo 15-day weather data
const generateWeatherData = (location: string) => {
  const days = []
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Clear']
  const icons = ['☀️', '⛅', '☁️', '🌧️', '🌤️']

  for (let i = 0; i < 15; i++) {
    const conditionIndex = Math.floor(Math.random() * conditions.length)
    days.push({
      day: i + 1,
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      condition: conditions[conditionIndex],
      icon: icons[conditionIndex],
      minTemp: Math.floor(Math.random() * 10) + 15,
      maxTemp: Math.floor(Math.random() * 10) + 25
    })
  }

  return days
}

export async function GET(
  request: NextRequest,
  { params }: { params: { location: string } }
) {
  try {
    const location = decodeURIComponent(params.location)
    const weatherData = generateWeatherData(location)

    return NextResponse.json({
      location,
      forecast: weatherData,
      isDemo: true,
      message: 'Demo weather data - replace with live API'
    })

  } catch (error) {
    console.error('[v0] Get weather error:', error)
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 })
  }
}
