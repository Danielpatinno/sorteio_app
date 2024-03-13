import { ButtonsContainer, Container, ContainerModal } from "./ModalDeleteAllClient.styles"

interface ModalDeleteClientProps {
  onCloseDelete: () => void
  onDelete: () => Promise<void>
  name: string
}

export function ModalDeleteAllClients({ 
  onCloseDelete,
  onDelete
}: ModalDeleteClientProps) {
  return (
    <Container>
      <ContainerModal>
        <h2>Atenção</h2>
        <p>Deseja reiniciar o sorteio ?</p>
        <p className="pObservation">Será excluido todos os números já vendidos</p>
        <ButtonsContainer>
          <button className="btnDelete" onClick={onDelete}>
            Confirmar
          </button>
          <button className="btnCancel" onClick={onCloseDelete}>
            Cancelar
          </button>
        </ButtonsContainer>
      </ContainerModal>
    </Container>
  )
}
