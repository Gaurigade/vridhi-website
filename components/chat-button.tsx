'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const messages = [
    { id: 1, sender: 'buyer', text: 'Hi, is the rice still available?' },
    { id: 2, sender: 'me', text: 'Yes, we have 500kg in stock.' },
    { id: 3, sender: 'buyer', text: 'Great! Can we discuss the price?' },
  ]

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg"
      >
        💬
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 bg-white shadow-xl flex flex-col">
          <div className="p-4 bg-green-600 text-white font-semibold rounded-t-lg">
            Messages
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-green-100 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className="bg-green-600 hover:bg-green-700">Send</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
