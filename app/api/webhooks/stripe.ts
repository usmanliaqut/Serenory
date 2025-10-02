// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const sig = headers().get('stripe-signature')
  
  if (!sig) {
    return new NextResponse('No signature found', { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('Payment succeeded:', paymentIntent.id)
        // Handle successful payment
        break
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Checkout completed:', session.id)
        // Handle completed checkout
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
    
    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
    })
  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}