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
              src={`http://localhost:3000/uploads/${currentImage}`} 
              alt='Imagem ainda não disponivel'  
            />  
        </ContainerImage>
        
    </Container>
  )
}