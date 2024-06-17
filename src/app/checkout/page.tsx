'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { useCart } from '@/context/cart-context'
import { CheckoutForm } from '@/components/checkout/checkout-form'

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const appearance = {
  rules: {
    '.Input': {
      borderRedius: '0.375rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      fontSize: '.875rem',
      lineHeight: '1.25rem',
      borderColor: '#e2e8f0'
    },
    '.label': {
        fontWeitht: '500',
        color: '#050a17',
        marginBottom: '0.375rem'
    },
    '.Input:focus': {
        boxShadow: '0 0 0 2px #fff, 0 0 0 4px #050a17',
        borderColor: '#e2e8f0'
    }
  }
}

export default function Checkout() {
  const { total } = useCart()

  return (
    <Elements stripe={stripe} options={{
      appearance,
      loader: 'auto',
      locale: 'pt-BR',
      mode: 'payment',
      currency: 'brl',
      amount: total
    }}>
      <CheckoutForm />
    </Elements>
  )
}