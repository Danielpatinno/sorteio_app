import { Container, InputContainer, NumberContainer } from "./ModalSelect.styles";

import { useAddClient } from "../../hooks/useAddClient";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from "../Input/Input";

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useState } from "react";
import { Client } from "../../hooks/useClientsQuery";

export interface ModalSelectProps {
  closeModal: () => void
  buyNumbers: number[]
  setState: React.Dispatch<React.SetStateAction<Client[] | undefined>>
  refetch: () => void
}

export interface DataClientProps {
  nameP: string
  phone: number 
  numbers: number[]
}

export interface InfoClient {
  _id: string
  name: string
  phone: number
  numbers: number[]
}

const validationClient = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório.' }),
  phone: z.string().min(9, {message: 'Insira um telefóne válido.'})
})

type SignInForm = z.infer<typeof validationClient>


export function ModalSelect({ closeModal, buyNumbers, setState, refetch}: ModalSelectProps) {  
  const addClient = useAddClient()
  const [verTodos, setVerTodos ] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm<SignInForm>({
    resolver: zodResolver(validationClient)
  })

  const onSubmit: SubmitHandler<SignInForm> = async (data:SignInForm) => {
    try {
      const clientData = {
        name: data.name,
        phone:data.phone,
        numbers: buyNumbers
      }
      
      await addClient.mutateAsync(clientData)
      
      console.log('Compra com sucesso')
      reset()
      refetch()
      closeModal()
    } catch (error) {
      console.log(`Erro ao fazer o POST: ${error}`)
    }
  }


  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
    <Container>
      <h3>Números selecionados</h3>
      <NumberContainer verTodos={verTodos}>
      {verTodos ? (
        buyNumbers.map((n) => (
          <p key={n}> {n}</p> 
        ))) : (
          buyNumbers.slice(0, 5).map((n) => (
            <p key={n}> {n}</p> 
          ))
        )
      }
      </NumberContainer>

      {buyNumbers.length > 5 && 
        <button onClick={() => setVerTodos(true)} className="btnVerMais">Ver todos</button>
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Preencha os dados abaixo</p>
          <InputContainer>
              <Input 
                id='name'
                mask=""
                placeholder="Digite o nome do cliente"
                type='text'
                error={errors.name?.message}
                label="Nome"
                {...register('name')}
              />
          </InputContainer>

          <InputContainer>
            <Input 
              id='phone'
              mask="(99) 99999-9999"
              placeholder="Digite o telefóne do cliente"
              type='text'
              error={errors.phone?.message}
              label="Telefone"
              {...register('phone')}
            /> 
          </InputContainer>
          <button className="btnConfirm">Comprar</button>
        </form>
      <button 
        onClick={closeModal}
        className='btnCancel'
        >Cancelar
      </button>

    </Container>
    </StyleSheetManager>
  )
}