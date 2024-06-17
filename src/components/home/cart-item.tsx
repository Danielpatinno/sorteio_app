import { Product } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface CartItemProps {
  product: Product
  updateProduct: (id: string, quantity: number) => void
  removeProduct: (id:string) => void
}

export function CartItem({
  product,
  removeProduct,
  updateProduct
}: CartItemProps) {
  const price = formatPrice((product.price / 100) * product.quantity)

  return (
    <div className="flex flex-1 items-center gap-2">
      <div className="relative h-16 w-16">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1200px) 100%"
        />
      </div>

      <div className="flex-">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{product.name}</span>
          <span className="text-sm text-zinc-500">{price}</span>
        </div>
      

      <div className="mt-2 flex items-center gap-2">
        <Button 
          variant='outline'
          size='sm'
          onClick={() => updateProduct(product.id, product.quantity - 1)}
        >
          <Minus size={20}/>
        </Button>

        <span>{product.quantity}</span>

        <Button 
          variant='outline' 
          size='sm'
          onClick={() => updateProduct(product.id, product.quantity + 1)}
        >
          <Plus size={20} />
        </Button>

        <Button 
          variant='outline' 
          size='sm'
          onClick={() => removeProduct(product.id)}
        >
          <Trash className="text-red-500" size={20} />
        </Button>
        </div>
      </div>
    </div>
  )
}