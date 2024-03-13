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
import { ClientContainer, Container } from "./Compradores.styles";
import { Alert } from "../../components/Alert";
import { useDeleteAllClients } from "../../hooks/useDeleteAllClients";
import { ModalDeleteAllClients } from "../../components/ModalDeleteAllClients";

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

  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState<boolean>(false)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)

  const [cliId, setCliId] = useState<string>('')
  const [nameD, setNameD] = useState<string>('')

  const openM = (n: string) => {
    setCliId(n)
    setOpenModalDetail(true)
  }

  const closeModal = () => {
    setOpenModalDetail(false)
    setCliId('')
  }

  const openModalD = (clientId: string) => {
    setCliId(clientId)
    setNameD('')
    setOpenModalDelete(true)
  }

  const closeModalD = () => {
    setOpenModalDelete(false)
    setCliId('')
  }

  const closeModalAll = () => {
    setOpenModalDeleteAll(false)

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

      alert('Reiniciado')
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
      <Container>
        {openModalDetail && 
          <ModalClientDetail 
            clientId={cliId} 
            closeModal={closeModal}
          />
        }

        {openModalDelete && 
          <ModalDeleteClient 
             name={nameD}
             onCloseDelete={closeModalD}
             onDelete={handleDeleteClient}
          />
        }

         {openModalDeleteAll && 
          <ModalDeleteAllClients 
             name={nameD}
             onCloseDelete={closeModalAll}
             onDelete={handleDeleteAllClients}
          />
        }


        {alertOpen && 
          <Alert 
            closeAlert={() => {
              setAlertOpen(false)
              window.location.reload()
            }} 
            type="error" 
            msg="Compra excluida"
          />
        }

        <h1>Compradores</h1>
        {data?.totalClients === 0 ? (
          <p>Nenhum número vendido</p>
          ):(
            <div>
              <p>Número compradores: {data?.totalClients}</p>
              <button onClick={() => setOpenModalDeleteAll(true)}>Reiniciar sorteio</button>
            </div>
            
          )}
                
          <ClientContainer>
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
            
              {data?.clients.map((cliente) => (      
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