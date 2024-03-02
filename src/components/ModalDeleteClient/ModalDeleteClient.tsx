import { ButtonsContainer, Container, ContainerModal } from "./ModalDeleteClient.styles"

interface ModalDeleteClientProps {
  onCloseDelete: () => void
  onDelete: () => Promise<void>
  name: string
}

export function ModalDeleteClient({ 
  onCloseDelete,
  onDelete,
  name
}: ModalDeleteClientProps) {
  return (
    <Container>
      <ContainerModal>
        <h2>Cancelamento</h2>
        <p>Deseja cancelar a compra ?</p>
        <ButtonsContainer>
          <button className="btnDelete" onClick={onDelete}>
            Confirmar
          </button>
          <button className="btnCancel" onClick={onCloseDelete}>
            Fechar
          </button>
        </ButtonsContainer>
      </ContainerModal>
    </Container>
  )
}
