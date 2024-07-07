"use client"

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { CreditCard, ShoppingCart, TriangleAlert  } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { CartItem } from "./cart-item";

export function Cart() {
  const { products, total, updateProduct, removeProduct } = useCart()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleGoToCheckout = () => {
    if(!products.length) {
      setOpen(false)
      return toast({
        action: (
            <div className="flex w-full items-center gap-6">
              <TriangleAlert className="text-red-500"/>
              <span>Carrinho vazio</span>
            </div>
        )
    })
    }
    router.push('/checkout')
    setOpen(false)
  }

  const totalPrice = formatPrice(total / 100)

  return (
    <div className="relative">
      <div>
        <Button variant='outline' size='icon' onClick={() => setOpen(!open)}>
            <ShoppingCart className="text-zinc-500" size={24}/>
            {products.length >= 1 && 
              <p 
                className="flex rounded-3xl bg-red-500 text-white h-6 w-6 border-2 text-xs top-6 right-8 absolute items-center justify-center"
              >
                {products.length}
              </p>
            }
        </Button>
      </div>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-80 sm:w-96 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Seu Carrinho</h3>
              <span className="text-gray text-sm">Total: {totalPrice}</span>
            </div>
          </div>

          <ul>
            {products.map((product) => (
              <li 
                key={product.id}
                className="flex w-full items-center justify-between border-t border-b py-4"
              >
                <CartItem 
                  product={product} 
                  updateProduct={updateProduct}
                  removeProduct={removeProduct}
                />
              </li>
            ))}
          </ul>

          <div >
            <Button className="w-full" 
            onClick={handleGoToCheckout}
            >
              <CreditCard />
              Finalizar Pedido
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}