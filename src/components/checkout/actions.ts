'use server'

import { createPaymentIntent, lineItems } from "@/lib/stripe"

export async function createClientSecret(amount: number, lineItems: lineItems[]): Promise<string> {
  const { client_secret } = await createPaymentIntent(amount, lineItems)

  return client_secret!;
}

