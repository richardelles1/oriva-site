'use client'

import { useSearchParams, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/utils/supabase'

export default function SuccessPage() {
  const { tableId } = useParams()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [sessionData, setSessionData] = useState<null | { name: string, amount: number }>(null)

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId || typeof tableId !== 'string') return

      try {
        const res = await fetch(`/api/session-info?session_id=${sessionId}`)
        const data = await res.json()

        const name = data.name || 'Guest'
        const amount = parseFloat((data.amount_total / 100).toFixed(2))

        setSessionData({ name, amount })

        const { error } = await supabase.from('Payments').insert([
          {
            table_id: tableId,
            user_name: name,
            amount_paid: amount,
          }
        ])

        if (error) {
          console.error('❌ Failed to insert payment:', error)
        } else {
          console.log('✅ Payment inserted into Supabase')
        }
      } catch (err) {
        console.error('❌ Failed to fetch session or insert payment:', err)
      }
    }

    fetchSession()
  }, [sessionId, tableId])

  if (!sessionData) {
    return (
      <main className="min-h-screen bg-[#0B0F1C] text-white flex flex-col items-center justify-center px-4 pt-16">
        <Image src="/oriva_logo_official.png" alt="Oriva Logo" width={140} height={48} className="mb-6 w-28 md:w-32" />
        <h1 className="text-2xl font-serif text-white/70">Loading your receipt...</h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] text-white flex flex-col items-center justify-center px-4 pt-16">
      <Image
        src="/oriva_logo_official.png"
        alt="Oriva Logo"
        width={140}
        height={48}
        className="mb-6 w-28 md:w-32"
      />
      <h1 className="text-3xl font-serif font-semibold text-center mb-4 text-[#FFD28F]">
        Thank You, {sessionData.name}!
      </h1>
      <p className="text-white/80 mb-6 text-center">
        Your payment of <span className="text-[#FFD28F] font-semibold">${sessionData.amount}</span> was successful.
        <br />
        Your split is now complete.
      </p>

      <a
        href={`/table/${tableId}/summary`}
        className="bg-[#FFD28F] hover:bg-[#FEC56B] text-black px-6 py-3 rounded-full text-lg font-semibold transition hover:-translate-y-1"
      >
        View Table Summary
      </a>
    </main>
  )
}
