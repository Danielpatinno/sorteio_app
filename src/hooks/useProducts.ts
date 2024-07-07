// hooks/useProductActions.ts
import { useState, useEffect } from 'react';
import { Product, useCart } from '@/context/cart-context';
import { useToast } from "@/components/ui/use-toast";
import { Check } from 'lucide-react';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addProduct } = useCart();
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product:Product) => {
    addProduct({
      ...product,
      quantity: 1
    })

  }

  useEffect(() => {
    fetchProducts()
  },[])

  return { products, loading, error, handleAddProduct };
};

export default useProducts;
