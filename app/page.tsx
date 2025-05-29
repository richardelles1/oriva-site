'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const features = [
    {
      title: 'Faster Flow',
      desc: 'Leave the table without waiting on the check.',
      icon: '/icons/fast.png',
      alt: 'Lightning bolt icon',
    },
    {
      title: 'No More Math',
      desc: 'Everyone pays for what they ordered — no headaches.',
      icon: '/icons/math.png',
      alt: 'Division symbol icon',
    },
    {
      title: 'Real-Time Split',
      desc: 'See who’s paid and who’s pending at a glance.',
      icon: '/icons/realtime.png',
      alt: 'Stopwatch icon',
    },
    {
      title: 'POS Friendly',
      desc: 'Works with restaurant systems and QR codes.',
      icon: '/icons/pos.png',
      alt: 'QR code scanner icon',
    },
  ]

  return (
    <main className="min-h-screen bg-[#0B0F1C] text-white flex flex-col items-center px-4 pb-24 pt-12">
      {/* Logo Header */}
      <header className="w-full flex justify-center mb-8">
        {mounted && (
          <Image
            src="/oriva_logo_official.png"
            alt="Oriva Logo"
            className="h-20 md:h-24 w-auto"
            width={300}
            height={100}
            priority
          />
        )}
      </header>

      {/* Hero Text */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-[#FFCC88] to-white bg-clip-text text-transparent animate-shimmer-strong">
          Scan & Split Your Bill
        </h1>
        <p className="mt-4 text-lg text-[#E0E0E0] max-w-2xl mx-auto">
          Oriva makes group dining payments smooth, fast, and shared.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {features.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 backdrop-blur-md border border-[#FFD28F]/20 bg-gradient-to-br from-white/5 to-[#1c1f2b] shadow-[0_0_40px_8px_rgba(255,210,143,0.05)] hover:shadow-[0_0_50px_10px_rgba(255,210,143,0.2)] transition-all hover:-translate-y-1 flex items-center gap-5"
          >
            <div className="flex-shrink-0">
              <Image
                src={card.icon}
                alt={card.alt}
                width={48}
                height={48}
                className="rounded-xl bg-[#151925] p-2 shadow-[0_0_20px_rgba(255,210,143,0.2)]"
              />
            </div>
            <div>
              <h3 className="text-[#FFD28F] font-semibold text-lg mb-1">{card.title}</h3>
              <p className="text-white/90 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Button */}
      <div className="mt-16">
        <Link href="/table/join">
          <button className="bg-[#FFCC88] hover:bg-[#FEC56B] text-black font-semibold text-lg px-6 py-3 rounded-full shadow-inner transform hover:-translate-y-1 transition-all duration-200 ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)]">
            Enter the Flow
          </button>
        </Link>
      </div>
    </main>
  )
}
