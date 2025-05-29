'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JoinPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [tableCode, setTableCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 🔧 Inject demo values if user skips fields
    const safeName = name.trim() || 'Taylor'
    const safeCode = tableCode.trim() || 'A1B2'

    router.push(`/table/${safeCode}/claim?user=${encodeURIComponent(safeName)}`)
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] text-white px-6 py-12 flex flex-col items-center font-sans">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/oriva_logo_official.png"
          alt="Oriva Logo"
          width="180"
          height="48"
          className="drop-shadow-md"
        />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong mb-6">
        Join Your Table
      </h1>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-6 ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] space-y-5 animate-fade-in-up"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Taylor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#0B0F1C] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]"
          />
        </div>

        {/* Table Code Field */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-white mb-1">
            Table Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="e.g. A1B2"
            value={tableCode}
            onChange={(e) => setTableCode(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#0B0F1C] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]"
          />
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-[#FFCC88] px-6 py-3 text-[#0B0F1C] font-serif font-semibold shadow-inner transition hover:bg-[#FEC56B] hover:-translate-y-1 ring-1 ring-[#FFD28F]/30"
        >
          Start Your Split
        </button>
      </form>
    </main>
  )
}
