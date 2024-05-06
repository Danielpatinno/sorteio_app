import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster, toast } from "sonner"
import { Button } from "../Button"
import { Input } from "../Input"

import { useAuth } from "@/hooks/useAuth"
import { useUpdateAdm } from "@/hooks/useUpdateAdm"
import { useEffect, useState } from "react"
import { useError } from "@/hooks/useError"

interface dataEditProps {
  password: string
  confirmPassword: string
  idAdm: string | undefined
}

export function EditPassword() {
  const { admId } = useAuth()
  const editPassword = useUpdateAdm()
  const { error, handleErrorEdit, clearError } = useError()

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const handleEditPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      clearError()
      e.preventDefault();
  
      const dataEdit:dataEditProps = {
        password,
        confirmPassword,
        idAdm: admId
      };
  
      await editPassword.mutateAsync(dataEdit);

      toast.success('Senha alterada.');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      handleErrorEdit(error)
    }
  };

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error])

  return (
    <AlertDialog>
        <AlertDialogTrigger>
          <Button 
            labelButton="Nova Senha" 
            variantSize="large"
          />
        </AlertDialogTrigger>
    
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Criar nova senha</AlertDialogTitle>
    
            <AlertDialogDescription>
              <form onSubmit={handleEditPassword} className="m-auto w-80">
              <div className="sr-only">
                <label htmlFor="username">Nome de usuário:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

                <div className="h-20 text-white">
                  <Input 
                    type='password' 
                    label="Nova Senha" 
                    mask=""
                    placeholder="Digite uma nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />  
                </div>
                
                <div className="h-20 text-white">
                  <Input
                    type='password' 
                    label="Confirmar Senha" 
                    mask="" 
                    placeholder="Digite a confirmação"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />    
                </div>   
                <button
                  className="text-white text-center w-20 h-8 m-auto flex justify-center  items-center rounded bg-blackSec" type="submit">
                  Enviar
                </button>
              </form>
              
            </AlertDialogDescription>
    
        </AlertDialogHeader>
        
        <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
        </AlertDialogFooter>
        </AlertDialogContent>
        <Toaster />
        
    </AlertDialog>
  )
}
