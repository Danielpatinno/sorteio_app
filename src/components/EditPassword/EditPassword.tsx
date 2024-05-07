import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Alterar minha senha</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleEditPassword}>
        <DialogHeader>
          <DialogTitle>Alterar Senha</DialogTitle>
          <DialogDescription>
            Digite a nova senha abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Nova Senha
            </Label>
            <Input
              id="novaSenha"
              defaultValue=""
              type="password"
              className="col-span-3"
              placeholder="Digite uma nova senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-right">
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              defaultValue=""
              type='password'
              className="col-span-3"
              placeholder="Digite a confirmação"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
