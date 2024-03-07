import { Container } from "./Message.styles"

export type AlertType = 'success' | 'error'

interface MessageProps {
  msg: string
  type: AlertType
}

export function Message({ msg, type }: MessageProps) {
    return (
        <Container type={type} >
            <p>{msg}</p>
        </Container>
    )

}