'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Message {
  type: 'bot' | 'user'
  text: string
  quickReplies?: string[]
}

export default function Chatbot() {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'Hi there! 👋 How can I help you today?',
      quickReplies: ['Admissions', 'Office Hours', 'Contact Info'],
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Hide chatbot on admin and dashboard routes
  const shouldHideChatbot =
    pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSendMessage = async (message?: string) => {
    const text = message || inputMessage
    if (!text.trim() || isLoading) return

    setMessages(prev => [...prev, { type: 'user', text }])
    setInputMessage('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: data.reply ?? 'No response received.',
          quickReplies: ['Admissions', 'Programs', 'Visit Campus'],
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: '⚠️ Unable to connect right now. Please try again later.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  /** ✅ FIX: quick reply handler */
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  if (shouldHideChatbot) return null

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:scale-110 transition flex items-center justify-center"
        aria-label="Open Chatbot"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Image
            src="/taugamma.jpg"
            alt="Chat"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[95vw] sm:w-96 h-[520px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/perpetual-logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">
                  Perpetual Help Assistant
                </h3>
                <p className="text-xs opacity-90">Las Piñas Campus</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-orange-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      message.type === 'user'
                        ? 'bg-orange-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.type === 'bot' && message.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 text-xs border border-orange-500 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm">
                  Typing…
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2 bg-white">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
