import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const sales: any[] = []

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sellerId = searchParams.get('sellerId')

    if (sellerId) {
      const sellerSales = sales.filter(s => s.sellerId === parseInt(sellerId))
      return NextResponse.json(sellerSales)
    }

    return NextResponse.json(sales)

  } catch (error) {
    console.error('[v0] Get sales error:', error)
    return NextResponse.json({ error: 'Failed to fetch sales' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sellerId, productType, qty, unitPrice, buyer, date } = await request.json()

    const newSale = {
      id: sales.length + 1,
      sellerId,
      productType,
      qty,
      unitPrice,
      totalPrice: qty * unitPrice,
      buyer,
      date,
      editedAt: null,
      history: []
    }

    sales.push(newSale)

    return NextResponse.json(newSale, { status: 201 })

  } catch (error) {
    console.error('[v0] Create sale error:', error)
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
  }
}
