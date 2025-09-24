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

  // Backend URL (Render dagi server manzili)
  const BACKEND_URL = "https://chatbot-backend-1-g6ym.onrender.com"

  useEffect(() => {
    // 🔥 Ping funksiyasi — backendni "tirik" ushlab turish uchun
    const interval = setInterval(async () => {
      try {
        await axios.get(`${BACKEND_URL}/`)
        console.log("Ping yuborildi ✅")
      } catch (err) {
        console.error("Ping xatolik:", err)
      }
    }, 10 * 60 * 1000) // har 10 daqiqa

    return () => clearInterval(interval)
  }, [])

  const handleSend = async () => {
    if (!prompt.trim()) return

    const currentPrompt = prompt
    const userMessage = { text: currentPrompt, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    try {
      const res = await axios.post(`${BACKEND_URL}/ask`, { prompt: currentPrompt })
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
      {/* ... sizning qolgan UI kodingiz o‘sha-o‘sha qoladi ... */}
    </div>
  )
}

export default LuxuryChatbot
