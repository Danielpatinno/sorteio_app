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

import { editPedidoProps } from "@/pages/Compradores/Compradores";

interface EditProductProps {
  numbersComprado: number[],
  clientId: string
  handleEdit: (data: editPedidoProps) => Promise<void>
}

export function EditPedido({numbersComprado, clientId, handleEdit}:EditProductProps) {
  const [numeros, setNumeros] = useState<number[]>([])

  useEffect(() => {
    setNumeros(numbersComprado)
  }, [])

  const removeOneNumber = (index:number) => {    
    const novosNumeros = [...numeros]
    novosNumeros.splice(index, 1)
    setNumeros(novosNumeros)
  }

  const data = {
    clientId: clientId,
    numbers: numeros
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
            onClick={() => handleEdit(data)}>Confirmar
        </AlertDialogAction>
    </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 )
}