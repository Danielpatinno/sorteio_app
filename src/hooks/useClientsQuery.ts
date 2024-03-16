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

async function fetchClients():Promise<ClientQueryResponse> {
    const { data } = await api.get('/clients')
    return data
}

export function useClientsQuery() {
  const { data, refetch } = useQuery<ClientQueryResponse, Error, ClientQueryResponse>(
    ['clients'],
    () => fetchClients(),
    {
      staleTime: Infinity
    }
  );

  return { data, refetchClients: refetch };
}


// export function useClientsQuery() {
//   return useQuery({
//     queryKey: ['clients'],
//     queryFn: async () => await fethClients(),
//     staleTime: Infinity
//   })
// }