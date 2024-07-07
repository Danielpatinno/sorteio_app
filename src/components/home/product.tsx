import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Stripe from "stripe";

import { AddToCardButton } from "./add-to-card-button";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    categoria: Stripe.Metadata
  }
}

export function Product({ product }: ProductProps) {
  const price = formatPrice(product.price / 100)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-72 w-72">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1200px) 100%"
        />
      </div>

      <h3 className="m-0 text-xl font-semibold">{product.name}</h3>
      <p className="text-lg">{price}</p>
      <AddToCardButton key={product.id} product={product} />
    </div>
  )
}