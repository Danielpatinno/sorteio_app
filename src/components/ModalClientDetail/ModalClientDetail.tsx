import { useEffect, useState } from "react";
import { ButtonsContainer, Container, HeadContainer, LabelContainer, NumberContainer } from "./ModalClientDetail.styles";

import { useAddClient } from "../../hooks/useAddClient";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from "../Input/Input";
import { useClientDetails } from "../../hooks/useClientDetails";
import { useEditClient } from "../../hooks/useEditClient";

import { MdCancel } from "react-icons/md"

interface ModalClientDetailsProps {
  clientId: string
  closeModal: () => void
}

export function ModalClientDetail({clientId, closeModal}:ModalClientDetailsProps) {  
  const clientDetail = useClientDetails({clientId:clientId})
  const editClient = useEditClient()

  const [numerosComprados, setNumerosComprados] = useState<number[]>([])
  const [editar, setEditar] = useState<boolean>(false)
 
  useEffect(() => {
    if (clientDetail.data?.numbers) {
      setNumerosComprados(prev => [...new Set([...prev, ...clientDetail.data.numbers])]);
    }
  }, [clientDetail.data?.numbers])

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

  const handleDeleteEvery = () => {
    setNumerosComprados([])
    closeModal()
  }

  return (
    <Container>
      <HeadContainer>
        <h3>Alterar Compra</h3>
      </HeadContainer>
      <p>Comprador: {clientDetail.data?.name}</p>
{/*       
      
      <p>Telefóne: {clientDetail.data?.phone}</p> */}
      {editar ? (
        <button onClick={() => setEditar(false)}>Cancelar alteração</button>
      ):(
        <button onClick={() => setEditar(true)}>Alterar pedido</button>
      )}
      
     <NumberContainer>
        {numerosComprados.map((numero, i) => (
          <div key={i}>
            <p className="numberP">{numero}</p>

            {editar && <MdCancel 
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
