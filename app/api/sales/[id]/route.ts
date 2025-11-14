import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const sales: any[] = []

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updates = await request.json()

    const saleIndex = sales.findIndex(s => s.id === id)
    
    if (saleIndex === -1) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 })
    }

    const oldSale = { ...sales[saleIndex] }

    // Update sale and track history
    sales[saleIndex] = {
      ...sales[saleIndex],
      ...updates,
      totalPrice: updates.qty * updates.unitPrice,
      editedAt: new Date().toISOString(),
      history: [
        ...sales[saleIndex].history,
        {
          editedAt: new Date().toISOString(),
          previousValues: oldSale
        }
      ]
    }

    return NextResponse.json(sales[saleIndex])

  } catch (error) {
    console.error('[v0] Update sale error:', error)
    return NextResponse.json({ error: 'Failed to update sale' }, { status: 500 })
  }
}
