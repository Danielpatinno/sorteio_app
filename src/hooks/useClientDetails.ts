import { useQuery } from "react-query"

import { Client } from "./useClientsQuery"
import { api } from "../services/projetoSorteioApi"

interface ClientDetailsQueryArgs {
  clientId: string
}

async function fetchClientDetails({clientId}: ClientDetailsQueryArgs) {
  const { data } = await api.get<Client>(`/clientDetails/${clientId}`)

  return data
}

export function useClientDetails({ clientId }: ClientDetailsQueryArgs) {
    return useQuery({
        queryKey: ['client-details', clientId],
        queryFn: async () => fetchClientDetails({clientId})
    })
}
