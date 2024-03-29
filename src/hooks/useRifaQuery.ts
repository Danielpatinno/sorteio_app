import { useQuery } from "react-query";
import { api } from "../services/projetoSorteioApi";

export interface Rifa {
  _id: string
  rifaImage: string
}

// interface RifaResponde {
//   rifa: Rifa[]
// }



async function fethRifa(): Promise<void> {
  const { data } = await api.get('/getImage')
  return data
}

export function useRifaQuery() {
  const { data } = useQuery(
    ['rifa'],
    () => fethRifa(),
    {
      staleTime: Infinity
    }
  )

    return { data }
}

// export function useRifaQuery() {
//   const { data, refetch } = useQuery<Rifa, Error, Rifa>(
//     ['rifa'],
//     () => fethRifa(),
//     {
//       staleTime: Infinity
//     }
//   );

//   return { data, refetchRifa: refetch };
// }

// export function useRifaQuery() {
//   return useQuery({
//     queryKey: ['rifa'],
//     queryFn: async () => await fethRifa(),
//     staleTime: Infinity
//   })
// }
