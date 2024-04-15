// Hooks
import { useEffect, useState } from "react";
import { useClientsQuery } from '../../hooks/useClientsQuery'
import { useDeleteClient } from '../../hooks/useDeleteClients'

// Components
import { ModalClientDetail } from "../../components/ModalClientDetail";
import { ModalDeleteClient } from "../../components/ModalDeleteClient";

// Icons
import { MdDeleteOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa";

// Styles
import { ClientContainer, Container, OptionsContainer } from "./Compradores.styles";
import { Alert } from "../../components/Alert";
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";
import { ModalDeleteAllClients } from "../../components/ModalDeleteAllClients";
import { Link } from "react-router-dom";
import { useDeleteImage } from "../../hooks/useDeleteImage";
import { Button } from "@/components/Button";

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
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState<boolean>(false)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertOpenDelete, setAlertOpenDelete] = useState<boolean>(false)

  const [cliId, setCliId] = useState<string>('')
  const [nameD, setNameD] = useState<string>('')

  const openM = (n: string) => {
    setCliId(n)
    setOpenModalDetail(true)
  }

  const openModalD = (clientId: string) => {
    setCliId(clientId)
    setNameD('')
    setOpenModalDelete(true)
  }  

  const handleDeleteClient = async () => {
    try {
      await deleteClient.mutateAsync({clientId: cliId})
      
      setOpenModalDelete(false)
      setAlertOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAllClients = async() => {
    try {
      await deleteAllClients.mutateAsync()

      setOpenModalDeleteAll(false)
      setAlertOpenDelete(true)
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
      <div className="m-auto w-10/12 text-center text-white">
        {openModalDetail && 
          <ModalClientDetail 
            clientId={cliId} 
            closeModal={() => {
              setOpenModalDetail(false)
              refetchClients()
              setCliId('')
            }}
          />
        }

        {openModalDelete && 
          <ModalDeleteClient 
             name={nameD}
             onCloseDelete={() => {
              setOpenModalDelete(false)
              refetchClients()
              setCliId('')
             }}
             onDelete={handleDeleteClient}
          />
        }

         {openModalDeleteAll && 
          <ModalDeleteAllClients 
             name={nameD}
             onCloseDelete={() => {
               setOpenModalDeleteAll(false)
               refetchClients()
             }}
             onDelete={handleDeleteAllClients}
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
        }

        <h1>Administração</h1>
        <div className="flex flex-col">
          {data?.totalClients === 0 ? (
            <p className="text-left">Nenhum número vendido</p>
            ):(
              <div className="flex flex-col">
                <p className="text-left">Número compradores: {data?.totalClients}</p>
                <Button 
                  buttonFunction={() => setOpenModalDeleteAll(true)}
                  labelButton='Reiniciar Sorteio'
                  variantSize="large"
                />                
              </div>
              
            )} 
        </div>
 
          <div className="flex flex-col align-center w-full">
            <h3>Lista de compradores</h3>
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
                    <FaRegEdit 
                      size={25}
                      title="Alterar pedido"
                      onClick={() => openM(cliente._id)}
                    />   
                    <MdDeleteOutline 
                      size={25}
                      title="Deletar pedido"
                      onClick={() => openModalD(cliente._id)}
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