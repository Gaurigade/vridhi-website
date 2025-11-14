import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const messages: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { chatId, senderId, message } = await request.json()

    const newMessage = {
      id: messages.length + 1,
      chatId,
      senderId,
      message,
      createdAt: new Date().toISOString()
    }

    messages.push(newMessage)

    return NextResponse.json(newMessage, { status: 201 })

  } catch (error) {
    console.error('[v0] Send message error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
