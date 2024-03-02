import { useQuery } from "react-query"
import { api } from "../services/projetoSorteioApi"

export interface Client {
  _id: string
  name: string
  phone: number
  numbers: number[]    
}

interface ClientQueryResponse {
  totalClients: number
  clients: Client[]
}

async function fethClients():Promise<ClientQueryResponse> {
    const { data } = await api.get('/clients')
    return data
}

export function useClientsQuery() {
  return useQuery({
    queryFn: async () => await fethClients()
  })
}