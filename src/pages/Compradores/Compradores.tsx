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
import { useRifaQuery } from "../../hooks/useRifaQuery";

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

  // const closeModal = () => {
  //   setOpenModalDetail(false)
  //   refetchClients()
  //   setCliId('')
  // }



  // const closeModalD = () => {
  //   setOpenModalDelete(false)
  //   refetchClients()
  //   setCliId('')
  // }

  // const closeModalAll = () => {
  //   setOpenModalDeleteAll(false)
  //   refetchClients()
  // }

  const handleDeleteClient = async () => {
    try {
      await deleteClient.mutateAsync({clientId: cliId})
      
      setOpenModalDelete(false)
      setAlertOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteImage = useDeleteImage()

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
      <Container>
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
        <OptionsContainer>
          {data?.totalClients === 0 ? (
            <p>Nenhum número vendido</p>
            ):(
              <div>
                <p>Número compradores: {data?.totalClients}</p>
                <button onClick={() => setOpenModalDeleteAll(true)}>Reiniciar sorteio</button>
                
              </div>
              
            )}
            
            <Link to='/painelControle'>
              <button>Imagem da Rifa</button>
            </Link>               
        </OptionsContainer>
 
          <ClientContainer>
            <h3>Lista de compradores</h3>
          <table>
            <thead>
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
                  <td className="tdName">{cliente.name}</td>
                  <td className="tdPhone">{cliente.phone}</td>
                  <td className="tdNumbers">{cliente.numbers.join(', ')}</td>
                  <td className="action">
                    <FaRegEdit 
                      title="Alterar pedido"
                      onClick={() => openM(cliente._id)}
                    />   
                    <MdDeleteOutline 
                      title="Deletar pedido"
                      onClick={() => openModalD(cliente._id)}
                    />
                  </td>  
                </tr>    
              ))}
            </tbody>
          </table>
          </ClientContainer>
      </Container>
  )
}