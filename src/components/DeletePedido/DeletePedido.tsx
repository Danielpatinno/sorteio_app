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

import { MdDeleteOutline } from "react-icons/md"

interface DeletePedidoProps {
  clientId: string
  handleDelete: (clientId:string) => Promise<void>
}

export function DeletePedido({clientId, handleDelete }:DeletePedidoProps) {
return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MdDeleteOutline title="Deletar compra" size={25}/>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atenção</AlertDialogTitle>

          <AlertDialogDescription>Deseja excluir a compra ?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(clientId)}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
        
        </AlertDialogContent>
    </AlertDialog>
)
}