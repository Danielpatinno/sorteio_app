import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

interface addImageRifaProps {
  rifaImage: File | null
}

async function addRifaImage({
  rifaImage
}: addImageRifaProps): Promise<void> {
    await api.post('/addRifa', 
    {
      rifaImage
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export function useAddRifa() {
  return useMutation({
    mutationFn: (data: addImageRifaProps) => addRifaImage(data),
    onSuccess: () => {
      console.log('Imagem adicionada com sucesso.')
    }
  })
}
