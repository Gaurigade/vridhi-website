import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Mock DB for demo - replace with actual DB queries
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, phone, password, role, productType } = await request.json()

    // Validation
    if (!name || !phone || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Phone validation: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone must be exactly 10 digits' },
        { status: 400 }
      )
    }

    // Password validation: letters + numbers, min 8 chars, no special chars
    if (!/^[a-zA-Z0-9]{8,}$/.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters with letters and numbers only' },
        { status: 400 }
      )
    }

    // Check if phone already exists
    const existingUser = users.find(u => u.phone === phone)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      phone,
      passwordHash,
      role,
      productType: role === 'seller' || role === 'wholesaler' ? productType : null,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: 'Registration successful',
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error('[v0] Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
