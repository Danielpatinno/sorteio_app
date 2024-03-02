import { useMutation } from "react-query";  
import { api } from "../services/projetoSorteioApi";

interface registerClientProps {
  name: string
  phone: string
  numbers: number[]
}

async function registerClient({
  name,
  phone,
  numbers
}:registerClientProps): Promise<void> {
  await api.post('/create', {
    name,
    phone,
    numbers
  })
}

export function useAddClient() {
    return useMutation({
        mutationFn: (data: registerClientProps) => registerClient(data)
    })
}
