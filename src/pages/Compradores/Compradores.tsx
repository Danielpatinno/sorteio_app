import { useEffect, useState } from "react";
import { ModalClientDetail } from "../../components/ModalClientDetail";
import { InfoClient } from "../../components/ModalSelect/ModalSelect";
import { useClientsQuery } from '../../hooks/useClientsQuery'

import { deleteClientProps, useDeleteClient } from '../../hooks/useDeleteClients'

import { MdDeleteOutline } from "react-icons/md"
import { FaRegEdit, FaRegObjectUngroup } from "react-icons/fa";


import { ClientContainer, Container } from "./Compradores.styles";
import { useDrawNumber } from "../../hooks/useDrawNumber";
import { ModalDeleteClient } from "../../components/ModalDeleteClient";

interface CompradoresProps {
  state: InfoClient[]
}

export function Compradores({state}: CompradoresProps) {
  const { data } = useClientsQuery()
  const deleteClient = useDeleteClient()

  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  // const [numbers, setNumbers] = useState<number[]>([])

  // useEffect(() => {
  //   if (data && data.clients) {
  //     setNumbers([]);

  //     data.clients.forEach(client => {
  //       setNumbers(prevNumbers => [...prevNumbers, ...client.numbers]);
  //     }); 
  //   }
  // }, [data]);

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

  // const { numeroSorteado, sortearNumero } = useDrawNumber();
  // const [nameResult, setNameResult] = useState<string>()


// const verificarGanhador = () => {
//   setNameResult('');
//   const numeroSorteado = sortearNumero();
//   let ganhadorEncontrado = false;

//   data?.clients.forEach(cliente => {
//       if (cliente.numbers.includes(numeroSorteado)) {
//           setNameResult(cliente.name);
//           ganhadorEncontrado = true;
//       }
//   });

//   if (!ganhadorEncontrado) {
//       setNameResult('Não foi vendido');
//   }
// };


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
                <th>Nome</th>
                <th>Telefóne</th>
                <th>Números</th>
                <th className="action"></th>
              </thead>
           {data?.clients.map((cliente) => (      
              <tbody>
                <tr>
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
                      // onClick={() => handleDeleteClient(cliente._id)}
                    />
                  </td>  
                </tr>    
              </tbody>
            ))}
            </table>
            {/* <p key={cliente._id}>
             - {cliente.name}
            </p> */}
         
            {/* <button 
              onClick={() => openM(cliente._id)}>
                Detalhes
            </button>   
            <MdDeleteOutline 
              onClick={() => handleDeleteClient(cliente._id)}
            />     */}

          </ClientContainer>
          {/* <button onClick={verificarGanhador}>Sortear</button>
          <p>Número sorteado é: {numeroSorteado}</p>
          {nameResult && <p>O ganhador é: {nameResult}</p>} */}
      </Container>
    
  )
}