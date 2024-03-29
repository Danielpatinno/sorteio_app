import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

interface addImageRifaProps {
  rifaImage: string 
}

async function addRifaImage({ rifaImage }: addImageRifaProps): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('image', rifaImage);

    await api.post('/registerImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

  } catch (error) {
    throw error;
  }
}

export function useAddRifa() {
  return useMutation({
    mutationFn: (data: addImageRifaProps) => addRifaImage(data),
    onSuccess: () => {
      console.log('Imagem adicionada com sucesso.')
    }
  })
}
