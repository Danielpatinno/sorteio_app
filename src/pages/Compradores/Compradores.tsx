// Hooks
import { useEffect, useState } from "react";
import { useClientsQuery } from '../../hooks/useClientsQuery'
import { useDeleteClient } from '../../hooks/useDeleteClients'

// Icons
import { MdDeleteOutline } from "react-icons/md"

// Styles
import { Alert } from "../../components/Alert";
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";

import { Button } from "@/components/Button";

import { AiFillDelete } from "react-icons/ai"

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
import { EditPedido } from "@/components/EditPedido";
import { DeletePedido } from "@/components/DeletePedido";

interface Client {
  _id: string
  name: string
  phone: number
  numbers: number[]    
}

export function Compradores() {
  const { data, refetchClients } = useClientsQuery();

  const deleteClient = useDeleteClient();
  const deleteAllClients = useDeleteAllClients()

  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  useEffect(() => {
    setDataItems(data?.clients)
  },[data])

  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertOpenDelete, setAlertOpenDelete] = useState<boolean>(false)

  const [cliId, setCliId] = useState<string>('')

  const handleDeleteClient = async (clientId:string) => {
    try {
      await deleteClient.mutateAsync({clientId: clientId})
 
      setAlertOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAllClients = async() => {
    try {
      await deleteAllClients.mutateAsync()

      setAlertOpenDelete(true)
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
      <div className="m-auto w-10/12 text-center text-white">
        {/* {openModalDetail && 
          <ModalClientDetail 
            clientId={cliId} 
            closeModal={() => {
              setOpenModalDetail(false)
              refetchClients()
              setCliId('')
            }}
          />
        }

        {alertOpen && 
          <Alert 
            closeAlert={() => {
              setAlertOpen(false)
              refetchClients()
            }} 
            type="error" 
            msg="Compra excluida"
          />
        }

        {alertOpenDelete && 
          <Alert 
            closeAlert={() => {
              setAlertOpenDelete(false)
              refetchClients()
            }} 
            type="success" 
            msg="Sorteio reiniciado"
          />
        } */}

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

                    <DeletePedido clientId={cliente._id} />
                  </td>  
                </tr>    
                ))} 

            </tbody>
          </table>
          </div>
      </div>
  )
}