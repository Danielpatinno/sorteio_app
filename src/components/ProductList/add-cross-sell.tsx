"use client"

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Check, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface AddToCardButtonProp {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }
}

export function AddToCrossSells({ product }: AddToCardButtonProp) {
  const { addProduct, products } = useCart()
  const { toast } = useToast()

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
      <Plus className="" size={20}/>
    </Button>
  )
}