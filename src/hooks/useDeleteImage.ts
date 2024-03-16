import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

// interface deleteImageProps {
//   imageId: string | undefined
// }

async function deleteImages() {
    await api.delete(`/deleteRifa`)
}

export function useDeleteImage() {
    return useMutation({
        mutationFn: () => deleteImages()
    })
}