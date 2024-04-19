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

import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"
import { useEffect, useState } from "react";

interface EditProductProps {
  numbersComprado: number[],
  clientId: string
}

import { useEditClient } from "@/hooks/useEditClient";


export function EditPedido({numbersComprado, clientId}:EditProductProps) {
  const [numeros, setNumeros] = useState<number[]>([])
  const editClient = useEditClient()

  useEffect(() => {
    setNumeros(numbersComprado)
  }, [])

  const removeOneNumber = (index:number) => {    
    const novosNumeros = [...numeros]
    novosNumeros.splice(index, 1)
    setNumeros(novosNumeros)
  }

  const handleEdit = async () => {
    try {
            
      const data = {
        clientId:clientId,
        numbers: numeros
      }
      
      await editClient.mutateAsync(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaRegEdit title="Editar compra" size={25}/>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Alterar números comprados</AlertDialogTitle>

            <AlertDialogDescription>
            <p>Números comprados</p>
            <div className="flex justify-center">
                {
                numeros.map((numero, i) => (
                <div className="flex flex-col">
                    <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3">{numero}</p>

                    <AiFillDelete 
                      onClick={() => removeOneNumber(i)} className="m-auto" 
                      size={15}
                    />
                </div>
                ))}
            </div>
            </AlertDialogDescription>

        </AlertDialogHeader>
        
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleEdit}>Confirmar
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}