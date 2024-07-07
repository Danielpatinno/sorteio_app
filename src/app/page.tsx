import { getProducts } from "@/lib/stripe";
import Image from "next/image";

import hero from '@/assets/hero.jpg'
import { Product } from "@/components/home/product";

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      <section className="border-b">
        <div className="container flex flex-col sm:flex-row">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl font-bold">
              A <span className="text-red-500">Melhor</span> pizza da cidade
            </h1>
            <p className="mt-4 text-xl sm:text-2xl">Faça seu pedido agora e experimente o sabor autêntico da Itália entregue na sua porta.</p>
          </div>

          <Image src={hero} alt='Homen de camisa vermelha fazendo sinal com a mão segurando caixas de pizzas' width={500}/>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <h2 className="mb-4 text-3xl font-semibold">Nosso Cardápio</h2>

          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.filter(product => product.categoria.categoria != 'coca').map(product => (
              <Product key={product.id} product={product}/>
            ))}
          </ul>

        </div>

        <div className="container py-14">
          <h2 className="mb-4 text-3xl font-semibold">Bebidas</h2>

          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.filter(product => product.categoria.categoria === 'coca').map(product => (
              <Product key={product.id} product={product}/>
            ))}
          </ul>

        </div>
      </section>
    </main>
  )
}
