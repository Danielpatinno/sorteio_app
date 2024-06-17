import { CreditCard, LockKeyhole, MapPin } from "lucide-react";
import { AddressElement, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button";
import { OrderSumary } from "./order-sumary";
import { FormEventHandler, useState } from "react";
import { createClientSecret } from "./actions";
import { Product, useCart } from "@/context/cart-context";
import { off } from "process";


export function CheckoutForm () {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const { total, products } = useCart()

  const createLineItems = (products: Product[]) => { 
    return products.map((product) => ({
        name: product.name,
        quantity: product.quantity
    }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if(!stripe || !elements) {
      return;
    }

    setLoading(true)

    const { error: submitError } = await elements.submit()

    if(submitError) {
      console.log(submitError)
      return;
    }

    const lineItems = createLineItems(products)

    const clientSecret = await createClientSecret(total, products)

    const { error } = await stripe.confirmPayment({
      elements, 
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000/confirmation'
      },
    })

    if(error) {
        console.log(error)
    }

    setLoading(false)
  }

  return (
    <main className="container mt-4">
      <div className="flex items-center gap-2 my-8">
        <LockKeyhole />
        <h1 className="text-2xl font-semibold">Finalize o seu pedido</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-8">
          <div className="flex w-1/2 flex-col gap-8">  
            <div className="w-full self-start rounded-lg border border p-6">
              <h2 className="mb-8 flex items-center gap-2 font-semibold">
                <MapPin size={20} />
                Endereço de Entrega
              </h2>

              <AddressElement options={{mode:'shipping'}}/>
            </div>

            <div className="w-full self-start rounded-lg border border p-6">
              <h2 className="mb-8 flex items-center gap-2 font-semibold">
                <CreditCard size={20} />
                Pagamento
              </h2>

              <PaymentElement />

              <Button 
                className="mt-8 w-full"
                disabled={loading} 
                type="submit">
                  Pagar
              </Button>                
            </div>
          </div>

          <OrderSumary />
        </div>
      </form>
    </main>
  )
}