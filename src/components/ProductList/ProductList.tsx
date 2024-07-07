
import { Product } from '@/context/cart-context';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { AddToCrossSells } from './add-cross-sell';
import { useState } from 'react';
import { Minus } from 'lucide-react';

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const filteredProducts = products.filter(product => product.categoria?.categoria === 'coca');

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRemove = () => {
    if (currentIndex < filteredProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0)
    }
  };

  const currentProduct = filteredProducts[currentIndex];

  if (!currentProduct) {
    return <div>Carregando...</div>;
  }

   return (
    <div>
      <ul>
      <li key={currentProduct.id} className='flex mt-4 self-start rounded-lg border items-center gap-4'>
          <div className="relative h-14 w-14">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill 
              sizes="(max-width: 1200px) 100%"/>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col items-right justify-between">
              <h3 className="text-lg font-semibold">{currentProduct.name}</h3>
              <span className="text-gray-500">{formatPrice(currentProduct.price / 100)}</span>
            </div>
          </div>

          <Minus size={20} className="cursor-pointer text-black rounded-lg" onClick={handleRemove} />
          <AddToCrossSells key={currentProduct.id} product={currentProduct}/>
           
        </li>
      </ul>
    </div>
  );
};
