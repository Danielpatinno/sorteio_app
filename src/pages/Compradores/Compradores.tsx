// Hooks
import { useEffect, useState } from "react";
import { useClientsQuery } from '../../hooks/useClientsQuery'
import { useDeleteClient } from '../../hooks/useDeleteClients'

// Components
import { ModalClientDetail } from "../../components/ModalClientDetail";
// import { ModalDeleteClient } from "../../components/ModalDeleteClient";

// Icons
import { MdDeleteOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa";

// Styles
// import { ClientContainer, Container, OptionsContainer } from "./Compradores.styles";
import { Alert } from "../../components/Alert";
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";
// import { ModalDeleteAllClients } from "../../components/ModalDeleteAllClients";
// import { Link } from "react-router-dom";
// import { useDeleteImage } from "../../hooks/useDeleteImage";
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
import { ClientRequest } from "http";



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
  // const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  // const [openModalDeleteAll, setOpenModalDeleteAll] = useState<boolean>(false)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertOpenDelete, setAlertOpenDelete] = useState<boolean>(false)

  const [cliId, setCliId] = useState<string>('')
  // const [nameD, setNameD] = useState<string>('')

  const openM = (n: string) => {
    setCliId(n)
    setOpenModalDetail(true)
  }

  // const openModalD = (clientId: string) => {
  //   setCliId(clientId)
  //   setNameD('')
  //   setOpenModalDelete(true)
  // }  


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
                    {/* <FaRegEdit 
                      size={25}
                      title="Alterar pedido"
                      onClick={() => openM(cliente._id)}
                    />   */}
                  {/* <tr >
                  <td className="text-left w-2/6 border-2">Daniel</td>
                  <td className="text-left w-2/6 border-2">(44) 99845-1188</td>
                  <td className="text-left w-2/6 border-2">12,25,15</td>
                  <td className="flex"> */}

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <FaRegEdit title="Editar compra" size={25}/>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Alterar compra</AlertDialogTitle>

                          <AlertDialogDescription>
                            <p>Números comprados</p>

                            {cliente.numbers.map((numero) => (
                              <div className="flex justify-center">
                                  <div className="flex flex-col">
                                    <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3">{numero}</p>
                                    <AiFillDelete className="m-auto" size={15}/>
                                  </div>
                                </div>
                            ))}
                            
                          </AlertDialogDescription>

                        </AlertDialogHeader>
                        
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>


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
                          {/* <AlertDialogAction onClick={() => handleDeleteClient(cliente._id)}>Deletar</AlertDialogAction> */}
                        </AlertDialogFooter>
                        
                      </AlertDialogContent>
                    </AlertDialog>

                  </td>  
                </tr>    
                ))} 
            </tbody>
          </table>
          </div>
      </div>
  )
}