'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'

type Payment = {
  user_name: string
  amount_paid: number
}

export default function SummaryPage() {
  const { tableId } = useParams()
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchSummary = async () => {
      if (!tableId || typeof tableId !== 'string') return

      // ✅ Skip table lookup — tableId IS the UUID
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)

      if (paymentsError) {
        console.error('❌ Payment lookup failed:', paymentsError)
        return
      }

      if (paymentsData) setPayments(paymentsData)
    }

    fetchSummary()
  }, [tableId])

  const total = payments.reduce((sum, p) => sum + p.amount_paid, 0)

  return (
    <div className="min-h-screen bg-[#0B0F1C] flex flex-col items-center justify-center text-white px-4">
      <Image
        src="/oriva_logo_official.png"
        alt="Oriva Logo"
        width={140}
        height={140}
        className="mb-6"
      />
      <h1 className="text-3xl font-serif font-bold mb-4">Final Table Summary</h1>

      {payments.length > 0 ? (
        <>
          <ul className="space-y-2 text-lg">
            {payments.map((p, idx) => (
              <li key={idx} className="text-white/90">
                {p.user_name} paid ${p.amount_paid.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-white font-semibold text-xl">
            Total Paid: ${total.toFixed(2)}
          </p>
        </>
      ) : (
        <p className="text-white/60 mt-6 text-lg italic">No payments yet.</p>
      )}
    </div>
  )
}
