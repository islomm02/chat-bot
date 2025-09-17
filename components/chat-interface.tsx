"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. This is a demo response from the luxury chatbot interface.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 border-b border-border/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground text-balance">Luxury AI Assistant</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Sophisticated conversations, refined experience</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex w-full", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div className={cn("max-w-[90%] sm:max-w-[80%] md:max-w-[60%]", message.role === "user" ? "order-2" : "order-1")}>
              <Card
                className={cn(
                  "p-3 sm:p-4 shadow-sm border-0 transition-all duration-200",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-2 sm:ml-4"
                    : "bg-card text-card-foreground mr-2 sm:mr-4",
                )}
              >
                <p className="text-sm leading-relaxed text-pretty">{message.content}</p>
                <time className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-card text-card-foreground p-3 sm:p-4 mr-2 sm:mr-4 max-w-[90%] sm:max-w-[80%] md:max-w-[60%] shadow-sm border-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs text-muted-foreground">AI is typing...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-3 sm:p-6">
        <div className="flex gap-2 sm:gap-3 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-10 sm:pr-12 h-10 sm:h-12 bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground rounded-xl transition-all duration-200 text-sm sm:text-base"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-10 sm:h-12 px-4 sm:px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 sm:mt-3 hidden sm:block">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  )
}
