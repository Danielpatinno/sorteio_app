import { useAddClient } from "../../hooks/useAddClient";
import { useEffect } from "react";
import { useError } from "@/hooks/useError";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import Input from "../Input/Input";
import { Button } from "../Button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Toaster, toast } from 'sonner'

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
  phone: z.string().min(14, {message: 'Insira um telefóne válido.'})
})

type SignInForm = z.infer<typeof validationClient>

interface ModalSelectProps {
  numbers: number[]
  resetNumbers: () => void
  refetch: () => void
}

export function BuyNumbers({numbers, resetNumbers, refetch}:ModalSelectProps) {  
  const addClient = useAddClient()
  const { error, handleErrorEdit, clearError } = useError()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
   } = useForm<SignInForm>({
    resolver: zodResolver(validationClient)
  })

  const onSubmit: SubmitHandler<SignInForm> = async (data:SignInForm) => {
    try {
      clearError()

      const clientData = {
        name: data.name,
        phone:data.phone,
        numbers: numbers
      }
      
      await addClient.mutateAsync(clientData)
      
      toast.success('Comprado com sucesso')
      resetNumbers()
      reset()
      refetch()
    } catch (error) {
      handleErrorEdit(error)
      console.log(`Erro ao fazer o POST: ${error}`)
    }
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error])

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variantSize="large"
          labelButton="Comprar números"/>
      </AlertDialogTrigger>
      <AlertDialogContent>

      {numbers.length ? 
        (
          <h3 className="flex m-auto mt-0 text-white">Números selecionados</h3>
        ) :
        (
          <h3 className="flex m-auto mt-0 text-white">Nenhum número selecionado</h3>
        )}
 
      {numbers.length > 5 ? (
        <div className="grid grid-cols-5 overflow-y-auto h-16 scrollbar-thin">
        {numbers.map((n) => (
          <p key={n} className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md mr-2">{n}</p>
        ))}
      </div>
      ):(
        <div className="flex justify-center">
          {numbers.slice(0, 5).map((n) => (
              <p className="flex justify-around items-center bg-black w-16 h-16 rounded-full mb-2 border-2 border-black text-greenWater text-2xl shadow-md  inset-y-3 inset-x-3"> {n}</p>
          ))}
         </div>
      )}

      <p className="text-center text-white">Preencha os dados abaixo</p>
      <form 
        className="flex flex-col w-72 h-130 items-center bg-black m-auto justify-center text-white rounded-2xl top-1/2 " 
        onSubmit={handleSubmit(onSubmit)}>
              <Input 
                id='name'
                mask=""
                placeholder="Digite o nome do cliente"
                type='text'
                error={errors.name?.message}
                label="Nome"
                {...register('name')}
              />

              <Input 
                id='phone'
                mask="(99) 99999-9999"
                placeholder="Digite o telefóne do cliente"
                type='text'
                error={errors.phone?.message}
                label="Telefone"
                {...register('phone')}
              /> 

            <AlertDialogFooter>
              <AlertDialogAction 
                disabled={!isValid} 
                type='submit'>
                Comprar
              </AlertDialogAction>
              <AlertDialogCancel 
                className="text-black">
                Cancelar
              </AlertDialogCancel>
            </AlertDialogFooter>
        </form>
  
    </AlertDialogContent>
    <Toaster />
    </AlertDialog>
  )
}
