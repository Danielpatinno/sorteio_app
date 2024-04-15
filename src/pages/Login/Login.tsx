import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import  Input from "../../components/Input/Input";

import { Message } from "../../components/Message";
import { useAuth } from "../../hooks/useAuth";
import { useError } from "../../hooks/useError";


const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório.' })
    .email({message: 'Insira um email válido.'}),
  password: z
    .string()
    .min(5, { message: 'A senha deve ter no mínimo 5 caracteres.' })
})

type SignInForm = z.infer<typeof validationSchema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<SignInForm>({
    resolver: zodResolver(validationSchema)
  })

  const { signIn, isAuthenticated } = useAuth()
  const { error, handleError, clearError } = useError()
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'

  const onSubmit: SubmitHandler<SignInForm> = async(data) => {
    try {
      clearError()
      await signIn(data)

      navigate(from)

    } catch (error) {
      handleError(error)
    }
  }

  if(isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <div className="flex justify-center items-center h-screen m-auto p-4 w-10/12 text-white">
      <div className="flex flex-col w-full ">

      <div className="mb-10">
        <h1 
          className="text-4xl text-center text-greenWater" 
          style={{ 
            textShadow: '0px 1px 6px #0AFFEF',
            fontFamily: 'Roboto Serif' 
          }} 
        >Login</h1>
      </div>
      

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input 
            label="E-mail"
            placeholder="Digite seu e-mail"
            type='text'
            mask=''
            id='email'
            error={errors.email?.message}
            {...register('email')}
          />        
        </div>
        
        <div>
          <Input 
            label="Senha"
            placeholder="Digite a senha"
            type='password'
            mask=''
            id='password'
            error={errors.password?.message}
            {...register('password')}
          />        
        </div>
        
        <div className="flex justify-center">
          <Button 
            variantSize="normal" 
            labelButton="Entrar"
            type="submit"
          />  
        </div>
          
        {error && <Message msg={error} type="error"/> }

      </form>
    </div>
    </div>
  )
}