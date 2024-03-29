import { useMutation } from "react-query";
import { api } from "../services/projetoSorteioApi";

async function deleteImages() {
    await api.delete(`/deleteImage`)
}

export function useDeleteImage() {
    return useMutation({
        mutationFn: () => deleteImages()
    })
}