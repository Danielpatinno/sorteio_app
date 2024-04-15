import { useMutation } from "react-query"
import { api } from "../services/projetoSorteioApi"

export interface deleteClientProps {
  clientId: string
}

async function deleteClient({clientId}: deleteClientProps) {
    await api.delete(`/delete/${clientId}`)
}

export function useDeleteClient() {
    return useMutation({
        mutationFn: (clienteId: deleteClientProps) => deleteClient(clienteId)
    })
}
