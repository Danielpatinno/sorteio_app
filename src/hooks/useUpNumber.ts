import { useMutation } from "react-query";
import { api } from "@/services/projetoSorteioApi";

export interface updateNumberProps {
  numberArray: number
}

async function updateNumber({ numberArray}: updateNumberProps) {
  const { data } = await api.put(`/updateNumber`, {
    numberArray
  });
  return data;
}

export function useUpdateNumber() {
  return useMutation({
    mutationFn: (data:updateNumberProps) => updateNumber(data)
  })
}
