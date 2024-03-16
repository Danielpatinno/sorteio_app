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
  const { data, refetch } = useQuery<Client, Error, Client>(
    ['client-details', clientId],
    () => fetchClientDetails({ clientId }),
    {
      staleTime: Infinity
    }
  );

  return { data, refetchClientDetails: refetch };
}

// export function useClientDetails({ clientId }: ClientDetailsQueryArgs) {
//   return useQuery({
//     queryKey: ['client-details', clientId],
//     queryFn: async () => fetchClientDetails({clientId}),
//     staleTime: Infinity
//   })
// }
