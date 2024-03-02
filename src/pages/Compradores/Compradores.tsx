import { useState } from "react";
import { ModalClientDetail } from "../../components/ModalClientDetail";
import { useClientsQuery } from '../../hooks/useClientsQuery'

import { useDeleteClient } from '../../hooks/useDeleteClients'

import { MdDeleteOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa";


import { ClientContainer, Container } from "./Compradores.styles";
import { ModalDeleteClient } from "../../components/ModalDeleteClient";


export function Compradores() {
  const { data } = useClientsQuery()
  const deleteClient = useDeleteClient()

  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

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
  const handleDeleteClient = async () => {
    try {
      await deleteClient.mutateAsync({clientId: cliId})

      window.location.reload()
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

        <h1>Compradores</h1>
        {data?.totalClients === 0 ? (
          <p>Nenhum número vendido</p>
          ):(
            <p>Número compradores: {data?.totalClients}</p>
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