// hooks
import { useEffect, useState } from "react";
import { useRifaQuery } from "../../hooks/useRifaQuery";
import { useAddRifa } from "../../hooks/useAddImage";

// Styles
import { Container, PreviewImageContainer } from "./PainelControle.styles";

// Components
import { Input } from "../../components/Input";
import { useDeleteImage } from "../../hooks/useDeleteImage";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import axios from "axios";

export function PainelControle() {
  const deleteImage = useDeleteImage()
  const [isLoading, setIsLoading] = useState(true);
  const [showNoImageMessage, setShowNoImageMessage] = useState(false);

  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false)
  const [isLoadingDel, setIsLoadingDel] = useState<boolean>(false)

  const [image, setImage] = useState<File | null>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openAlertAdd, setOpenAlertAdd] = useState<boolean>(false)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        setImage(file)
    }
  }

  const add = async () => {
    try {
      if(image) {
        setIsLoadingAdd(true)
        const formData = new FormData()
        formData.append("image", image)

      await axios.post('http://localhost:3000/registerImage', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })

      setIsLoadingAdd(false);
      setOpenAlertAdd(true);
      
      }
    } catch (error) {
      console.log(`Erro ao adicionar imagem: ${error}`)
    }
  }

  const handleDeleteRifa = async () => {
    try {
      setIsLoadingDel(true)
      setImage(null)
      await deleteImage.mutateAsync()
      
      setIsLoadingDel(false)
      setOpenAlert(true)

    } catch (error) {
      console.log(error)
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
        setShowNoImageMessage(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

    return (
      <Container>
        {openAlert && 
          <Alert 
            closeAlert={() => {
              setOpenAlert(false)
              setIsLoading(true)
            }}  
            msg='Imagem excluida com sucesso'
            type="success"
          />
        }

        {openAlertAdd && 
          <Alert 
            closeAlert={() => {
              setOpenAlertAdd(false)
            }}  
            msg='Imagem do sorteio adicionada.'
            type="success"
          />
        }


        <h1>Adicionar Imagem</h1>
        <Link to='/'>
          <button>Página inicial</button>
        </Link>
        <button 
          onClick={handleDeleteRifa}
          >
            Excluir imagem atual
        </button>

        {isLoadingDel && <p>Deletando Imagem...</p>}

        {image && !isLoadingDel ? (
          <PreviewImageContainer>
            <img 
              src={URL.createObjectURL(image)} 
              alt="Preview" 
            />
          </PreviewImageContainer>
        ):(
          <PreviewImageContainer>

            {isLoading && 
              <div>
                <p>Loading...</p>
              </div>
            } 

            {!isLoading && showNoImageMessage &&
              <div>
                <p>Imagem não disponivel</p>
              </div>
            }

            {!showNoImageMessage && 
              <img
                src={'http://localhost:3000/getImage'}
                alt='Imagem ainda não disponivel'
                onLoad={handleImageLoad} 
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            }
          </PreviewImageContainer>
        )}
        <div>
          <form >
            <Input 
              label="Selecione uma imagen"
              type='file'
              placeholder="Imagen"
              id="rifaImage"
              mask=""
              onChange={handleFileChange}
            />
            <button 
              type="button" 
              onClick={add}>
                {isLoadingAdd ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>            
        </div>
      </Container>
    )
}
