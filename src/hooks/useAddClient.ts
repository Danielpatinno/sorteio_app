import { useMutation } from "react-query";  
import { api } from "../services/projetoSorteioApi";
import { Client } from "./useClientsQuery";

interface registerClientProps {
  name: string
  phone: string
  numbers: number[]
}


async function registerClient({
  name,
  phone,
  numbers
}:registerClientProps): Promise<Client[] | undefined> {
  const response = await api.post('/create', {
    name,
    phone,
    numbers
  })

  return response.data
}
export function useAddClient() {
    return useMutation({
        mutationFn: (data: registerClientProps) => registerClient(data)
    })
}
