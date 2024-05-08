import { useEffect, useState } from "react";
import { useClientsQuery } from '../../hooks/useClientsQuery'
import { useDeleteClient } from '../../hooks/useDeleteClients'
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";
import { useError } from "@/hooks/useError";

import { EditPedido } from "@/components/EditPedido";
import { DeletePedido } from "@/components/DeletePedido";
import { useEditClient } from "@/hooks/useEditClient";
import { EditPassword } from "@/components/EditPassword";
import { ReiniciarSorteio } from "@/components/ReiniciarSorteio";

import { Toaster, toast } from 'sonner'

interface Client {
  _id: string
  name: string
  phone: number
  numbers: number[]    
}

import { TiThMenu } from "react-icons/ti"
import { IoMdClose } from "react-icons/io"

export interface editPedidoProps {
  clientId: string
  numbers: number[]
}

export function Compradores() {
  const { data } = useClientsQuery();
  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  const deleteClient = useDeleteClient();
  const deleteAllClients = useDeleteAllClients()
  const editClient = useEditClient()

  const { handleErrorEdit, error, clearError} = useError()

  useEffect(() => {
    setDataItems(data?.clients)
  },[data])

  const handleDeleteClient = async (clientId:string) => {
    try {
      clearError()
      await deleteClient.mutateAsync({clientId: clientId})
 
      setDataItems(prevData => prevData?.filter(client => client._id !== clientId))
      toast.success("Compra excluida.")
    } catch (error) {
      handleErrorEdit(error)
    }
  }

  const handleDeleteAllClients = async() => {
    try {
      clearError()
      await deleteAllClients.mutateAsync()

      setDataItems([])
      toast.success("Sorteio reiniciado.")
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (dataEdit: editPedidoProps) => {
    try {        
      clearError()
      await editClient.mutateAsync(dataEdit)

      setDataItems(prevData => {
        if (!prevData) return prevData;
  
        return prevData.map(client => {
          if (client._id === dataEdit.clientId) {
            return {
              ...client,
              name: client.name,
              phone: client.phone,
              numbers: dataEdit.numbers
            };
          }
          return client;
        })
      })

      toast.success('Número alterado')
    } catch (error) {
        handleErrorEdit(error)
    }
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error])

  const [openOption, setOpenMotion] = useState<boolean>(false)

  return ( 
      <div className="m-auto w-10/12 text-center text-white h-screen">

        <h1>Administração</h1>

      <header>
        {openOption ? (
          <IoMdClose className="cursor-pointer" size={25} onClick={() => setOpenMotion(false)} />
        ) : (
          <TiThMenu className="cursor-pointer" onClick={() => setOpenMotion(true)} size={25} />
        )}

        {openOption && (
          <div className="absolute flex m-2 gap-2 flex-col w-36 bg-black transition-opacity opacity-100">
            <EditPassword />
            <ReiniciarSorteio handleReiniciar={handleDeleteAllClients} />
          </div>
        )}

        {!openOption && (
          <div className="absolute flex flex-col gap-2 w-36 bg-black transition-opacity opacity-0 pointer-events-none">
            <EditPassword />
            <ReiniciarSorteio handleReiniciar={handleDeleteAllClients} />
          </div>
        )}
      </header>
 
          <div className="flex flex-col align-center mt-2 w-full">
            <h3 className="">Lista de compradores</h3>
          <table>
            <thead className="bg-blackSec text-left">
              <tr>
                <th className="text-center">N</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Números</th>
                <th className="action"></th>
              </tr>
            </thead>
            <tbody>     
              {dataItems?.map((cliente, i) => (      
                 <tr key={cliente._id}>
                  <td className="border-r border-b">{i+1}</td>
                  <td className="text-left w-2/6 border-r border-b">{cliente.name}</td>
                  <td className="text-left w-2/6 border-l border-r border-b">{cliente.phone}</td>
                  <td className="text-left w-2/6 border-l border-b">{cliente.numbers.join(', ')}</td>
                  <td className="flex">
                    {cliente.numbers.length > 1 && (<EditPedido 
                      clientId={cliente._id} 
                      numbersComprado={cliente.numbers}
                      handleEdit={handleEdit}
                    />)}

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
          <Toaster />
      </div>
  )
}