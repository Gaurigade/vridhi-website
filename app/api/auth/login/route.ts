import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Mock DB - replace with actual DB queries
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, phone, password } = await request.json()

    // Validation - all three fields required
    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: 'Name, phone, and password are all required' },
        { status: 400 }
      )
    }

    // Find user by phone first
    const user = users.find(u => u.phone === phone)

    if (!user) {
      return NextResponse.json(
        { error: 'No user found for this phone number' },
        { status: 401 }
      )
    }

    // Check if name matches (case-sensitive)
    if (user.name !== name) {
      return NextResponse.json(
        { error: 'Name does not match our records' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.passwordHash)

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Password incorrect' },
        { status: 401 }
      )
    }

    // Successful login - return user without password
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    }, { status: 200 })

  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
