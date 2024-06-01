import { ButtonContainer, variantSizes } from "./Button.styles"

interface ButtonProps {
  labelButton: string
  buttonFunction?: () => void
  variantsize: variantSizes
  type?: "button" | "submit" | "reset";
}

export function Button({
  labelButton,
  variantsize,
  buttonFunction,
  type,
}:ButtonProps) {
  return (
    <ButtonContainer 
      variantsize={variantsize}
      onClick={buttonFunction}
      type={type}
    >
      {labelButton}
    </ButtonContainer>
  )
}
