import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useClientsQuery } from "@/hooks/useClientsQuery";
import { useAuth } from "@/hooks/useAuth";


export function DrawmSorteio() {
  const [number, setNumber] = useState<number>()
  const [winningName, setWinningName] = useState<string>()  
  const [raffling, setRaffling] = useState<boolean>()
  const [numbersSend, setNumbersSend] = useState<number[]>([])
  const { arrayLength } = useAuth()

  const releaseDraw = numbersSend.length === arrayLength

  const { data } = useClientsQuery();

  useEffect(() => {
    if (data?.clients) {
        const allNumbers = data.clients.flatMap(client => client.numbers);
        setNumbersSend(allNumbers);
      }
      handleDraw()
    }, [data]);

  const handleDraw = () => {
    setRaffling(true);
    setTimeout(() => {
      const numberSorteio = Math.floor(Math.random() * arrayLength) + 1;
      setNumber(numberSorteio);
      checkWinner(numberSorteio)
      setRaffling(false);
    }, 10000);
  };

  const checkWinner = (number:number) => {
    data?.clients.map((teste) => {
        if(teste.numbers.includes(number)){
          setWinningName(teste.name)
        }
    })
  }

return (
    <AlertDialog>
    {releaseDraw && (
      <AlertDialogTrigger>
        <Button disabled={!releaseDraw}>
          Realizar Sorteio
        </Button>
      </AlertDialogTrigger>
    )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Sortear Número
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="m-auto text-white">
          {raffling ? 
            (
              <p className="text-center">Sorteando...</p>
            ):(
            <div className="flex flex-col items-center">
              <p>Número Sorteado</p>
              <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-greenWater text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3"
              >
                {number}
              </p>
              <p>Ganhador {winningName}</p>
            </div>
            )}
        </div>
         <AlertDialogFooter>
        <AlertDialogCancel>
            Fechar
        </AlertDialogCancel>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}