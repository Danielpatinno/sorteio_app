// Hooks
import { useEffect, useState } from "react";
import { useClientsQuery } from '../../hooks/useClientsQuery'
import { useDeleteClient } from '../../hooks/useDeleteClients'

// Styles
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";

// Components
import { Button } from "@/components/Button";
import { EditPedido } from "@/components/EditPedido";
import { DeletePedido } from "@/components/DeletePedido";

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


interface Client {
  _id: string
  name: string
  phone: number
  numbers: number[]    
}

export function Compradores() {
  const { data } = useClientsQuery();

  const deleteClient = useDeleteClient();
  const deleteAllClients = useDeleteAllClients()

  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  useEffect(() => {
    setDataItems(data?.clients)
  },[data])

  const handleDeleteClient = async (clientId:string) => {
    try {
      await deleteClient.mutateAsync({clientId: clientId})
 
      setDataItems(prevData => prevData?.filter(client => client._id !== clientId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAllClients = async() => {
    try {
      await deleteAllClients.mutateAsync()

      setDataItems([])
      
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
      <div className="m-auto w-10/12 text-center text-white">

        <h1>Administração</h1>
        <div className="flex flex-col">
          {data?.totalClients === 0 ? (
            <p className="text-left">Nenhum número vendido</p>
            ):(
              <div className="flex flex-col">
                <p className="text-left">Número compradores: {data?.totalClients}</p>
                
                <div className="text-left"> 
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        labelButton='Reiniciar Sorteio'
                        variantSize="large"
                      /> 
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Atenção</AlertDialogTitle>

                        <AlertDialogDescription>Deseja reiniciar o sorteio ?</AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAllClients}>Reiniciar</AlertDialogAction>
                      </AlertDialogFooter>
                      
                    </AlertDialogContent>
                  </AlertDialog>
                </div>     
              </div>
            )} 
        </div>
 
          <div className="flex flex-col align-center w-full">
            <h3 className="">Lista de compradores</h3>
          <table>
            <thead className="bg-blackSec text-left">
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Números</th>
                <th className="action"></th>
              </tr>
            </thead>
            <tbody>     
              {dataItems?.map((cliente) => (      
                 <tr key={cliente._id}>
                  <td className="text-left w-2/6 border-2">{cliente.name}</td>
                  <td className="text-left w-2/6 border-2">{cliente.phone}</td>
                  <td className="text-left w-2/6 border-2">{cliente.numbers.join(', ')}</td>
                  <td className="flex">
                    <EditPedido 
                      clientId={cliente._id} 
                      numbersComprado={cliente.numbers}
                    />

                    <DeletePedido 
                      clientId={cliente._id} 
                      handleDelete={handleDeleteClient}
                    />
                  </td>  
                </tr>    
                ))} 
            </tbody>
          </table>
          </div>
      </div>
  )
}