'use client'

import { useChat } from 'ai/react'
import type { Metadata } from 'next'
import { useEffect, useRef } from 'react'

// Note: metadata export doesn't work in client components; title is set in layout fallback
export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, status } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Dobrý den! Jsem asistentka ateliéru Věry Čončkové. Ráda vám pomohu s vaší zakázkou. Co byste si přáli nechat ušít nebo upravit?',
      },
    ],
  })

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <h1 className="ruzova">Chat s ateliérem</h1>

      <div className="chat-intro">
        Popište svou zakázku a naše asistentka vám pomůže sestavit poptávku. Na závěr ji
        odešleme přímo paní Čončkové.
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((m) => {
            const content = typeof m.content === 'string' ? m.content : null
            if (!content) return null
            return (
              <div key={m.id} className={`chat-bubble ${m.role === 'user' ? 'user' : 'assistant'}`}>
                {content}
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-row">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Napište zprávu…"
            disabled={isLoading}
            autoComplete="off"
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Odeslat
          </button>
        </form>

        <p className="chat-status">
          {status === 'streaming' ? 'Asistentka píše…' : ' '}
        </p>
      </div>
    </>
  )
}
