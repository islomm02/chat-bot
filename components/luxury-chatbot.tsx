"use client"

import axios from "axios"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"

function LuxuryChatbot() {
  interface MessageType {
    text: string
    isUser: boolean
  }
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const fetchData = async () => {}

    fetchData()
  }, [])

  const handleSend = async () => {
    if (!prompt.trim()) return

    const currentPrompt = prompt
    const userMessage = { text: currentPrompt, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    try {
      const res = await axios.post(`https://chatbot-backend-1-g6ym.onrender.com/ask`, { prompt: currentPrompt })
      console.log(res.data.answer)

      if (res.data.answer) {
        setMessages((prev) => [...prev, { text: res.data.answer, isUser: false }])
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong. Please try again.", isUser: false }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <nav className="flex bg-card/50 backdrop-blur-sm rounded-2xl justify-between py-4 px-4 sm:py-6 sm:px-8 items-center mb-4 sm:mb-8 border border-border/50 shadow-sm">
        <h2 className="font-medium text-lg sm:text-2xl text-foreground tracking-tight">AI Assistant</h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="/elegant-profile-avatar.png"
            className="rounded-full w-8 h-8 sm:w-12 sm:h-12 border border-border object-cover"
            alt="User profile"
          />
          <div className="hidden sm:block">
            <h2 className="font-medium text-base text-foreground">Dear User</h2>
            <p className="text-sm text-muted-foreground">ID: 12456</p>
          </div>
        </div>
      </nav>

      <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] overflow-y-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl mx-auto w-full">
        {messages.length ? (
          messages.map((item, index) => (
            <div key={index} className={`flex mb-4 sm:mb-8 ${item.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`${
                  item.isUser
                    ? "bg-primary text-primary-foreground ml-2 sm:ml-12"
                    : "bg-card text-card-foreground mr-2 sm:mr-12 border border-border/50"
                } p-4 sm:p-6 rounded-2xl max-w-[85%] sm:max-w-[75%] shadow-sm backdrop-blur-sm`}
              >
                <p className="text-sm sm:text-base leading-relaxed font-normal">{item.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 px-4">
              <h2 className="font-medium text-xl sm:text-2xl text-foreground tracking-tight">Start a conversation</h2>
              <p className="text-muted-foreground text-base sm:text-lg">Ask me anything to begin our chat</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start mb-4 sm:mb-8">
            <div className="bg-card text-card-foreground mr-2 sm:mr-12 border border-border/50 p-4 sm:p-6 rounded-2xl max-w-[85%] sm:max-w-[75%] shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 px-3 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="relative">
            <input
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              className={`bg-card/80 backdrop-blur-sm w-full rounded-2xl px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 text-sm sm:text-base border border-border/50 outline-none transition-all duration-300 placeholder:text-muted-foreground ${
                isFocused ? "shadow-lg border-primary/50 bg-card" : "shadow-sm"
              }`}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200 disabled:opacity-50 p-2 rounded-lg hover:bg-muted/50"
              disabled={isLoading || !prompt.trim()}
            >
              <Send size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LuxuryChatbot
