import { InputContainer } from "./ModalSelect.styles";

import { useAddClient } from "../../hooks/useAddClient";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import Input from "../Input/Input";
import { Button } from "../Button";
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
    <div className="flex flex-col absolute h-120 bg-black m-auto z-1 justify-center mt-2 w-240 text-white border-2  rounded-2xl p-6 top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
      <h3 className="flex m-auto mb-2 mt-0">Números selecionados</h3>
 
      {buyNumbers.length > 5 ? (
        <div className="grid grid-cols-5 overflow-y-auto h-16 scrollbar-thin">
        {buyNumbers.map((n) => (
          <p key={n} className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md mr-2">{n}</p>
        ))}
      </div>
      ):(
        <div className="flex justify-center">
          {buyNumbers.slice(0, 5).map((n) => (
              <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3"> {n}</p>
          ))}
         </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p className="text-center">Preencha os dados abaixo</p>
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
            <div className="flex m-auto">
              <Button
                labelButton="Comprar"
                variantSize="normal"
                type='submit'
              /> 
              <Button 
                labelButton="Cancelar"
                buttonFunction={closeModal}
                variantSize='normal'
              />              
            </div>    
          </div>
        </form>
    </div>
  )
}
