import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

async function deleteAllClient() {
  await api.delete('/deleteClients')
}

export function useDeleteAllClients() {
  return useMutation({
    mutationFn: () => deleteAllClient()
  })
}
