// lib/stripe.ts
import Stripe from 'stripe'

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
  typescript: true,
})

// ✅ Force a content diff for Vercel
// console.log('Stripe client configured!')

export default stripeClient
