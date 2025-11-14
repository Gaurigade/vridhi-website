import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const products: any[] = []

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')

    if (type) {
      const filteredProducts = products.filter(p => p.productType === type)
      return NextResponse.json(filteredProducts)
    }

    return NextResponse.json(products)

  } catch (error) {
    console.error('[v0] Get products error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, productType, sellerId, price, qty, imageUrl } = await request.json()

    const newProduct = {
      id: products.length + 1,
      name,
      productType,
      sellerId,
      price,
      qty,
      imageUrl,
      createdAt: new Date().toISOString()
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })

  } catch (error) {
    console.error('[v0] Create product error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
