import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const chats: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { participant1Id, participant2Id } = await request.json()

    // Check if chat already exists
    const existingChat = chats.find(
      c => (c.participant1Id === participant1Id && c.participant2Id === participant2Id) ||
           (c.participant1Id === participant2Id && c.participant2Id === participant1Id)
    )

    if (existingChat) {
      return NextResponse.json(existingChat)
    }

    // Create new chat
    const newChat = {
      id: chats.length + 1,
      participant1Id,
      participant2Id,
      createdAt: new Date().toISOString()
    }

    chats.push(newChat)

    return NextResponse.json(newChat, { status: 201 })

  } catch (error) {
    console.error('[v0] Create chat error:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}
