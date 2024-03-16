import { useEffect, useState } from "react";
import { useClientDetails } from "../../hooks/useClientDetails";
import { useEditClient } from "../../hooks/useEditClient";

import {
  ButtonsContainer,
  Container,
  HeadContainer,
  NumberContainer
} from "./ModalClientDetail.styles";

import { MdCancel } from "react-icons/md"
import { Client } from "../../hooks/useClientsQuery";

interface ModalClientDetailsProps {
  clientId: string
  closeModal: () => void
}

export function ModalClientDetail({clientId, closeModal}:ModalClientDetailsProps) {  
  const { data } = useClientDetails({clientId:clientId})
  const editClient = useEditClient()

  const [numerosComprados, setNumerosComprados] = useState<number[]>([])
  const [editar, setEditar] = useState<boolean>(false)
  const [dataItems, setDataItems] = useState<Client[]>([])
 
  useEffect(() => {
    if (data?.numbers) {
      setNumerosComprados(prev => [...new Set([...prev, ...data.numbers])]);
    }
  }, [data?.numbers])

  // useEffect(() => {
  //   setDataItems
  // }, [data])

  const handleEdit = async () => {
    try {
            
      const data = {
        clientId:clientId,
        numbers: numerosComprados
      }
      
      await editClient.mutateAsync(data)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAlone = (index:number) => {    
    const novosNumeros = [...numerosComprados]
    novosNumeros.splice(index, 1)
    setNumerosComprados(novosNumeros)
  }

  return (
    <Container>
      <HeadContainer>
        <h3>Alterar Compra</h3>
      </HeadContainer>
      <p>Comprador: {data?.name}</p>

      {editar && numerosComprados.length > 1 ? (
        <button onClick={() => setEditar(false)}>Cancelar alteração</button>
      ):(
        <button onClick={() => setEditar(true)}>Alterar pedido</button>
      )}
      
     <NumberContainer>
        {numerosComprados.map((numero, i) => (
          <div key={i}>
            <p className="numberP">{numero}</p>

            {editar && numerosComprados.length > 1 && <MdCancel 
              onClick={() => handleDeleteAlone(i)}
            />}
          </div>
        ))}      
     </NumberContainer>

      <ButtonsContainer>
        <button 
          onClick={handleEdit}
          >Confirmar
        </button>

        <button 
          onClick={closeModal}
          >Cancelar
        </button>        
      </ButtonsContainer>
    </Container>
  )
}
