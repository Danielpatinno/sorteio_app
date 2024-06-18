import { Check } from "lucide-react";
import Image from "next/image";
import confirmation from '@/assets/entregador.jpg'

export default function Confirmation () {
    return (
        <main className="container mt-4 flex flex-col sm:flex-row items-center">
          <div>
            <Check className="text-emerald-500" size={100} />
            <h1 className="text-4xl font-bold" >Obrigado, pedido efetuado!</h1>
            <p className="mt-4 text-2xl text-zinc-600">
                Em poucos minutos você receberá suas deliciosas pizzas.
            </p>
          </div>

          <Image src={confirmation} alt='Homen de camisa vermelha segurando caixa de pizza.'
          width={500}
          />
        </main>
    )
}