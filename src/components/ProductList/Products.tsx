import ProductsList from './ProductList';
import useProducts from '@/hooks/useProducts';

export default function Products () {
  const { products } = useProducts()

  return <ProductsList products={products} />;
};
