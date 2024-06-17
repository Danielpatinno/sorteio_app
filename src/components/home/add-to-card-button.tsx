"use client"

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Check, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddToCardButtonProp {
  product: {
    id: string;
    name: string;
    price: number;
    image: string
  }
}

export function AddToCardButton({ product }: AddToCardButtonProp) {
  const { addProduct, products } = useCart()
  const { toast } = useToast()

  console.log(products)

  const handleAddProduct = () => {
    addProduct({
        ...product,
        quantity: 1
    })

    toast({
        action: (
            <div className="flex w-full items-center gap-4">
              <Check className="text-emerald-600"/>
              <span>Produto adicionado ao carrinho</span>
            </div>
        )
    })
  }

  return (
    <Button onClick={handleAddProduct}>
      <ShoppingCart className="mr-2" size={20}/>
      Adicionar ao Carrinho
    </Button>
  )
}