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

export function PainelControle() {
  const { data, refetchRifa } = useRifaQuery()
  const deleteImage = useDeleteImage()
  const [ currentImage, setCurrentImage ] = useState<string>()
  // const [ imageId, setImageId ] = useState<string>()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const addRifa = useAddRifa()

  useEffect(() => {
    setCurrentImage(data?.rifaImage)
  },[ data ])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        setSelectedFile(file)
    }
  }

  const add = async () => {
    try {
      if(selectedFile) {
          const dataImagem = {
          rifaImage: selectedFile
        }
        await addRifa.mutateAsync(dataImagem)

        refetchRifa()

      }
    } catch (error) {
      console.log(`Erro ao adicionar imagem: ${error}`)
    }
  }

  const handleDeleteRifa = async () => {
    try {
      
      await deleteImage.mutateAsync()
      setOpenAlert(true)

    } catch (error) {
      console.log(error)
    }
  }

    return (
      <Container>

        {openAlert && 
          <Alert 
            closeAlert={() => {
              setOpenAlert(false)
              window.location.reload()
            }}  
            msg='Imagem excluida com sucesso'
            type="success"
          />
        }
        <h1>Adicionar Imagem</h1>
        <Link to='/'><button>Página inicial</button></Link>
        <button onClick={handleDeleteRifa}>Excluir imagem atual</button>

        {data?.rifaImage ? (
            <PreviewImageContainer>
                {selectedFile ? (
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                    />
                ): (
                  <img src={`https://api-rifa-tupperware.vercel.app/${currentImage}`} alt="Imagem rifa" />
                )}
            </PreviewImageContainer>
          ) : (
            <div>
              <PreviewImageContainer>
                
              {selectedFile && (
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                  />
              )}
              </PreviewImageContainer>              
            </div>
          )} 
          <div>

            <form onClick={add}>
                <Input 
                  label="Selecione uma imagen"
                  type='file'
                  placeholder="Imagen"
                  id="rifaImage"
                  mask=""
                  onChange={handleFileChange}
                />
                <input type="submit" value="Adicionar" />
            </form>            
          </div>
      </Container>
    )
}
