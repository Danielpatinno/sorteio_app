import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import  Input from "../../components/Input/Input";
import { useAuth } from "../../hooks/useAuth";
import { useError } from "../../hooks/useError";
import { Container, FormContainer, HeaderContainer, InputContainer } from "./Login.styles";

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório.' })
    .email({message: 'Insira um email válido.'}),
  password: z
    .string()
    .min(5, { message: 'A senha deve ter no mínimo 9 caracteres.' })
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
    <Container>
      <FormContainer>

      <HeaderContainer>
        <h1>Login</h1>
      </HeaderContainer>
      

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input 
            label="E-mail"
            placeholder="Digite seu e-mail"
            type='text'
            mask=''
            id='email'
            error={errors.email?.message}
            {...register('email')}
          />        
        </InputContainer>

        <InputContainer>
          <Input 
            label="Senha"
            placeholder="Digite a senha"
            type='password'
            mask=''
            id='password'
            error={errors.password?.message}
            {...register('password')}
          />        
        </InputContainer>



        <button>Login</button>        
      </form>
    </FormContainer>
    </Container>
  )
}