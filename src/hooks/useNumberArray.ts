import { api } from "@/services/projetoSorteioApi";
import { useQuery } from "react-query";

interface SorteioResponse {
  numberArray: number
}

async function fetchNumberArray() {
  const { data } = await api.get<SorteioResponse>(`/getNumber`)

  return data
}

export function useNumberArray() {
    const { data, isLoading, refetch } = useQuery<SorteioResponse, Error>(['numberArray'], () => fetchNumberArray());
  
    return {
      numberArrayData: data,
      isLoading,
      refetch
    };
  }
