import { Container, typeMessage } from "./Alert.styles";

interface AlertProps {
  closeAlert:() => void
  msg: string
  type: typeMessage
}

export function Alert({closeAlert, msg, type}: AlertProps) {
  return (
    <Container type={type} >
      {type === 'error' ? (
        <h3>Atenção</h3>
      ) : (
        <h3>Sucesso</h3>
      )}
      <p>{msg}</p>

      <button onClick={closeAlert}>Ok</button>
    </Container>
  )
}