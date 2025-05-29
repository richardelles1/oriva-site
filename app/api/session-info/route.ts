// app/api/session-info/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) return NextResponse.json({ error: 'No session ID' }, { status: 400 })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return NextResponse.json({
    name: session.metadata?.user_name || 'Guest',
    amount_total: parseFloat(session.metadata?.original_amount || '0') * 100,
  })
}