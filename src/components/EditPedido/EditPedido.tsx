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

interface EditProductProps {
  numbersComprado: number[]
}


export function EditPedido({numbersComprado}:EditProductProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaRegEdit title="Editar compra" size={25}/>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Alterar compra</AlertDialogTitle>

            <AlertDialogDescription>
            <p>Números comprados</p>
            <div className="flex justify-center">
                {
                numbersComprado.map((numero) => (
                <div className="flex flex-col">
                    <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3">{numero}</p>
                    <AiFillDelete className="m-auto" size={15}/>
                </div>
                ))}
            </div>
            </AlertDialogDescription>

        </AlertDialogHeader>
        
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}