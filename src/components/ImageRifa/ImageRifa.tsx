import { Container, ContainerImage } from "./ImageRifa.styles";

import { MdCancel } from "react-icons/md"
import { useRifaQuery } from "../../hooks/useRifaQuery";
import { useEffect, useState } from "react";

interface ImageRifaProps {
  urlImage: string
  closeRifa: () => void
}

export function ImageRifa({ urlImage, closeRifa }: ImageRifaProps) {
  const { data } = useRifaQuery()
  const [currentImage, setCurrentImage] = useState<string>()

  useEffect(() => {
    setCurrentImage(data?.rifaImage)
  }, [data])

  return (
    <Container>
        <MdCancel onClick={closeRifa} />
        <ContainerImage>
            <img
              src={`https://api-rifa-tupperware.vercel.app/uploads/${currentImage}`} 
              alt='Imagem ainda não disponivel'  
            />  
        </ContainerImage>
        
    </Container>
  )
}