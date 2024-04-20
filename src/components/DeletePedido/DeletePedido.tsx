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
import { useDeleteClient } from "@/hooks/useDeleteClients"

import { MdDeleteOutline } from "react-icons/md"

interface DeletePedidoProps {
  clientId: string
}

export function DeletePedido({clientId}:DeletePedidoProps) {
  const deleteClient = useDeleteClient()

  const handleDeleteClient = async (clientId:string) => {
    try {
      await deleteClient.mutateAsync({clientId: clientId})

    } catch (error) {
      console.log(error)
    }
  }

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
          <AlertDialogAction onClick={() => handleDeleteClient(clientId)}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
        
        </AlertDialogContent>
    </AlertDialog>
)
}