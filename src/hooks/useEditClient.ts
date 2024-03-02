import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

interface updateClientProps {
  numbers: number[]
  clientId: string
}

async function updateClient({numbers,clientId}:updateClientProps) {
    try {
        await api.put(`/clientUpdate/${clientId}`, {
            numbers
        })
    } catch (error) {
        console.log(error)
    }
}

export function useEditClient() {
  return useMutation({
    mutationFn: (data:updateClientProps) => updateClient(data)
  })
}