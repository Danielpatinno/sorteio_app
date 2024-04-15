import { Button } from "../Button";
import { Container, typeMessage } from "./Alert.styles";

interface AlertProps {
  closeAlert:() => void
  msg: string
  type: typeMessage
}

export function Alert({closeAlert, msg, type}: AlertProps) {
  let classH3Style = "m-auto mb-2 border-b border-b-white"

  return (
    <Container 
      type={type}
      className='flex flex-col bg-black fixed border-2 border-greenWater p-6 w-64 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'
    >
      {type === 'error' ? (
        <h3 className={classH3Style}>Atenção</h3>
      ) : (
        <h3 className={classH3Style}>Sucesso</h3>
      )}
      <p className="mb-2">{msg}</p>

      <Button variantSize="small" labelButton="OK" buttonFunction={closeAlert} />
    </Container>
  )
}