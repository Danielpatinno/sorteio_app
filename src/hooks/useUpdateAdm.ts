import { useMutation } from "react-query";
import { api } from "@/services/projetoSorteioApi";

interface updateAdmProps {
  password: string
  confirmPassword: string
  idAdm: string | undefined
}

async function updateClient({ password,confirmPassword, idAdm }: updateAdmProps) {
    const { data } = await api.put(`/updateAdm/${idAdm}`, {
      password,
      confirmPassword
    });
    return data;
}

export function useUpdateAdm() {
  return useMutation({
    mutationFn: (data:updateAdmProps) => updateClient(data)
  })
}
