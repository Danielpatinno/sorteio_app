import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
  apiVersion: '2024-04-10'
})

interface Product {
  id: string
  name: string
  price: number
  image: string
  categoria: Stripe.Metadata
}

export interface lineItems {
  name: string
  quantity: number
}


export async function getProducts(): Promise<Product[]> {
  const response = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: price ? price.unit_amount || 0 : 0,
        categoria: product.metadata
    };
  });

  return products;
}

export async function createPaymentIntent(
  amount:number, 
  lineItems: lineItems[]
): Promise<Stripe.Response<Stripe.PaymentIntent>>{
  const patmentIntent = await stripe.paymentIntents.create({
    amount,
    currency:'brl',
    metadata: {
      lineItems: JSON.stringify(lineItems)
    }
  })

  return patmentIntent
}
