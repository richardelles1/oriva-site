// lib/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15' as unknown as Stripe.LatestApiVersion,
  typescript: true,
})

export default stripe
