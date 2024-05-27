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

export interface Client {
  _id: string
  name: string
  phone: number
  numbers: number[]    
}

import { TiThMenu } from "react-icons/ti"
import { IoMdClose } from "react-icons/io"
import { DrawmSorteio } from "@/components/DrawmSorteio";
import { useUpdateNumber } from "@/hooks/useUpNumber";
import { useAuth } from "@/hooks/useAuth";

export interface editPedidoProps {
  clientId: string
  numbers: number[]
}

type updateNumberProps = {
  numberArray: number;
};

export function Administration() {
  const { data } = useClientsQuery();
  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  const deleteClient = useDeleteClient();
  const deleteAllClients = useDeleteAllClients()
  const editClient = useEditClient()
  const { refetchNumberArray } = useAuth()

  const updateNumberArray = useUpdateNumber()

  const { handleErrorEdit, error, clearError} = useError()

  useEffect(() => {
    setDataItems(data?.clients)
    refetchNumberArray()
  },[data])

  const handleDeleteClient = async (clientId:string) => {
    try {
      clearError()
      await deleteClient.mutateAsync({clientId: clientId})
 
      setDataItems(prevData => prevData?.filter(client => client._id !== clientId))
      refetchNumberArray()
      toast.success("Compra excluida.")
    } catch (error) {
      handleErrorEdit(error)
    }
  }

  const handleDeleteAllClients = async (numberSelect: number) => {
    try {
      if (numberSelect > 100 || numberSelect < 20) {
        return toast.error("Escolha entre 20 a 100");
      }
  
      const numberProps: updateNumberProps = { numberArray: numberSelect };
      await updateNumberSorteio(numberProps);
      clearError();
      await deleteAllClients.mutateAsync();
  
      setDataItems([]);
      toast.success("Sorteio reiniciado.");
    } catch (error) {
      console.error("Erro ao deletar todos os clientes:", error);
      toast.error("Erro ao reiniciar o sorteio. Tente novamente.");
    }
  };
  
  const updateNumberSorteio = async (numberArray: updateNumberProps) => {
    try {
      await updateNumberArray.mutateAsync(numberArray);
      refetchNumberArray()
    } catch (error) {
      console.error("Erro ao atualizar o número do sorteio:", error);
      toast.error("Erro ao atualizar o número do sorteio. Tente novamente.");
    }
  };

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
      <div className="m-auto w-10/12 text-center text-white h-screen bg-black">

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
            <ReiniciarSorteio 
              handleReiniciar={handleDeleteAllClients} />
            <DrawmSorteio />
          </div>
        )}

        {!openOption && (
          <div className="absolute flex flex-col gap-2 w-36 bg-black transition-opacity opacity-0 pointer-events-none">
            <EditPassword />
            <ReiniciarSorteio handleReiniciar={handleDeleteAllClients} />
            <DrawmSorteio />
          </div>
        )}
      </header>
        <h3 className="">Lista de compradores</h3>

        <div className="overflow-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-blackSec text-left">
              <tr>
                <th className="w-1/4 p-3 tracking-wide">Nome</th>
                <th className="border-l w-1/4 p-3 tracking-wide">Telefone</th>
                <th className="border-l w-2/4 p-3 tracking-wide">Números</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody className="">
              {dataItems?.map((cliente) => (      
                <tr key={cliente._id}>
                  <td className="whitespace-nowrap text-left p-2 border-r border-b">{cliente.name}</td>
                  <td className="whitespace-nowrap text-left p-2 border-l border-r border-b">{cliente.phone}</td>
                  <td className="whitespace-nowrap text-left p-2 border-l border-b">{cliente.numbers.join(', ')}</td>
                  
                  <td className="flex">
                    {cliente.numbers.length > 1 && (
                      <EditPedido 
                        clientId={cliente._id} 
                        numbersComprado={cliente.numbers}
                        handleEdit={handleEdit}
                      />
                    )}
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