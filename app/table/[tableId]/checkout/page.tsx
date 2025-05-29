'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'

export default function CheckoutPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const tableCode = params.tableId as string
  const userName = searchParams.get('user') || 'Guest'

  const [allItems, setAllItems] = useState<any[]>([])
  const [evenSplitCount, setEvenSplitCount] = useState<number | null>(null)
  const [tipPercent, setTipPercent] = useState<number>(15)
  const [customTip, setCustomTip] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [tableId, setTableId] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: tableData, error: tableError } = await supabase
        .from('Tables')
        .select('id, even_split_count')
        .eq('table_code', tableCode)
        .single()

      if (tableError || !tableData) {
        console.error('Table fetch error:', tableError)
        return
      }

      setTableId(tableData.id)
      setEvenSplitCount(tableData.even_split_count)

      const { data: itemsData, error: itemsError } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableData.id)

      if (itemsError) {
        console.error('Items fetch error:', itemsError)
        return
      }

      setAllItems(itemsData)
      setIsLoading(false)
    }

    fetchData()
  }, [tableCode])

  if (isLoading) return <div className="text-center mt-10 text-white">Loading checkout info...</div>

  const totalBill = allItems.reduce((sum, item) => sum + (item.price || 0), 0)

  const individualSubtotal = evenSplitCount !== null && evenSplitCount > 0
    ? totalBill / evenSplitCount
    : allItems
        .filter((item) => {
          if (!item.is_selected_by) return false
          if (Array.isArray(item.is_selected_by)) {
            return item.is_selected_by.includes(userName)
          }
          return item.is_selected_by === userName
        })
        .reduce((sum, item) => {
          const splitCount = Array.isArray(item.is_selected_by)
            ? item.is_selected_by.length
            : 1
          return sum + item.price / splitCount
        }, 0)

  const subtotal = Number(individualSubtotal.toFixed(2))
  const tipValue = customTip
    ? parseFloat(customTip)
    : (subtotal * tipPercent) / 100
  const total = Number((subtotal + tipValue).toFixed(2))

  const handlePay = async () => {
    if (total <= 0) {
      alert('Total must be greater than $0 to proceed.')
      return
    }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, amount: total, tableId }),
    })

    const { url } = await res.json()
    if (url) {
      window.location.href = url
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] text-white flex flex-col items-center pt-12 px-4">
      <Image src="/oriva_logo_official.png" alt="Oriva" width={120} height={40} className="mb-4" />
      <h1 className="text-2xl font-serif mb-6">{userName}’s Selection</h1>

      <div className="w-full max-w-md bg-[#11152A] rounded-2xl p-6 shadow-lg ring-1 ring-[#FFD28F]/30 space-y-4">
        {evenSplitCount ? (
          <>
            <p className="text-white/80 text-center">
              You’re splitting evenly with <b>{evenSplitCount}</b> people.
              <br />
              <span className="text-sm text-white/60">
                Everyone pays the same amount — no need to claim items.
              </span>
            </p>
            <div className="mt-4 space-y-2">
              {allItems.map((item) => (
                <div key={item.id} className="flex justify-between text-white/80">
                  <span>{item.item_name}</span>
                  <span>${(item.price / evenSplitCount).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          allItems
            .filter((item) =>
              Array.isArray(item.is_selected_by)
                ? item.is_selected_by.includes(userName)
                : item.is_selected_by === userName
            )
            .map((item) => (
              <div key={item.id} className="text-white/80 flex justify-between">
                <span>
                  {item.item_name}{' '}
                  <span className="text-xs italic text-white/50">Claimed by: {userName}</span>
                </span>
                <span>
                  ${Number(item.price / (Array.isArray(item.is_selected_by) ? item.is_selected_by.length : 1)).toFixed(2)}
                </span>
              </div>
            ))
        )}

        <div className="border-t border-white/10 pt-2 space-y-1 text-white">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tip ({customTip ? `${customTip}%` : `${tipPercent}%`})</span>
            <span>${tipValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-[#FFD28F] pt-1">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 space-x-2 flex flex-wrap">
          {[15, 18, 20, 25].map((p) => (
            <button
              key={p}
              onClick={() => {
                setTipPercent(p)
                setCustomTip('')
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                tipPercent === p && !customTip
                  ? 'bg-[#FFD28F] text-black font-semibold'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {p}%
            </button>
          ))}
          <button
            onClick={() => {
              setTipPercent(0)
              setCustomTip('')
            }}
            className="px-3 py-1 rounded-full text-sm bg-white/10 hover:bg-white/20"
          >
            No Tip
          </button>
          <input
            type="number"
            placeholder="Custom"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            className="px-2 py-1 w-20 bg-white/10 rounded-full text-sm text-white placeholder:text-white/50"
          />
        </div>

        <button
          onClick={handlePay}
          className="w-full mt-4 bg-[#FFD28F] hover:bg-[#FEC56B] text-black py-2 rounded-full text-lg font-semibold transition-transform transform hover:-translate-y-1"
        >
          Confirm & Pay
        </button>
      </div>
    </main>
  )
}
