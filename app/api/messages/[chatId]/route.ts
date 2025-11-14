import { NextRequest, NextResponse } from 'next/server'

// Mock DB - replace with actual DB queries
const messages: any[] = []

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> } // Added Promise wrapper for params per Next.js 16 requirements
) {
  try {
    const { chatId } = await params
    const chatIdNum = parseInt(chatId)
    const chatMessages = messages.filter(m => m.chatId === chatIdNum)

    return NextResponse.json(chatMessages)

  } catch (error) {
    console.error('[v0] Get messages error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
