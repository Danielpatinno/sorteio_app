import { Container, ContainerImage, MensagemContainer } from "./ImageRifa.styles";

import { MdCancel } from "react-icons/md"
import { useEffect, useState } from "react";

interface ImageRifaProps {
  closeRifa: () => void
}

export function ImageRifa({ closeRifa }: ImageRifaProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showNoImageMessage, setShowNoImageMessage] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowNoImageMessage(true);
        setIsLoading(false)
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <Container>
      <MdCancel onClick={closeRifa} />
      <ContainerImage>
        {isLoading && !showNoImageMessage && 
          <MensagemContainer>
            <p>Loading...</p>
          </MensagemContainer>
        }
        
        {!isLoading && showNoImageMessage && 
          <MensagemContainer>
            <p>Imagem não disponivel ainda</p>
          </MensagemContainer>
        }

        {!showNoImageMessage && 
          <img
            src={'https://api-sorteio-ha14.vercel.app/getImage'}
            alt='Imagem Rifa'
            onLoad={handleImageLoad}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        }
      </ContainerImage>
    </Container>
  );
}