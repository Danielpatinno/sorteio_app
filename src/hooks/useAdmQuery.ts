import { api } from "@/services/projetoSorteioApi";
import { useQuery } from "react-query";

interface AdmResponse {
  name: string
  email: string
}

interface AdmDetailsQueryArgs {
  admId: string | undefined
}

async function fetchAdmDetails({ admId }: AdmDetailsQueryArgs) {
  const { data } = await api.get<AdmResponse>(`/adm/${admId}`)

  return data
}

export function useAdmQuery({ admId }: AdmDetailsQueryArgs) {
    return useQuery(['adm', admId], () => fetchAdmDetails({ admId }), {
      staleTime: Infinity
    });
}