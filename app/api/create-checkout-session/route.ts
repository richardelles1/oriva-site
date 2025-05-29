// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, tableId, userName } = body

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Oriva Payment for ${userName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/table/${tableId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/table/checkout?table=${tableId}&user=${encodeURIComponent(userName)}`,
      metadata: {
        user_name: userName,
        table_id: tableId,
        original_amount: amount.toString(),
      },
    })

    if (!session.url) {
      return new NextResponse('Stripe session creation failed', { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return new NextResponse('Stripe session creation failed', { status: 500 })
  }
}