import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

interface Adm {
  _id: number
  name: string
  email: string
}

interface SignInAdm {
  email: string
  password: string
}

export interface SignInResponse {
  adm: Adm
  token: string
}

async function signInAdm({
  email,
  password
}: SignInAdm): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>('/loginAdm', {
    email,
    password
  })

  return data
}

export function useSignIn() {
  return useMutation(
    { mutationFn: (data: SignInAdm) => signInAdm(data)})
}