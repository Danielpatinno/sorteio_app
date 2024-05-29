import { ButtonContainer, variantSizes } from "./Button.styles"

interface ButtonProps {
  labelButton: string
  buttonFunction?: () => void
  variantSize: variantSizes
  type?: "button" | "submit" | "reset";
}

export function Button({
  labelButton,
  variantSize,
  buttonFunction,
  type,
}:ButtonProps) {
  return (
    <ButtonContainer 
      variantSize={variantSize}
      onClick={buttonFunction}
      type={type}
    >
      {labelButton}
    </ButtonContainer>
  )
}
