import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react"
import { Container } from "./Input.styles"
import InputMask from 'react-input-mask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  placeholder: string
  mask: string
}

export default forwardRef<HTMLInputElement, InputProps>(
  function Input({id, error,placeholder,mask, label,type, ...props}, ref:ForwardedRef<HTMLInputElement>) {
    return (
      <Container error={Boolean(error)}>
        <label htmlFor={id}>{label}</label>

        <InputMask 
          {...props}
          placeholder={placeholder} 
          type={type} 
          id={id} 
          inputRef={ref} 
          mask={mask}
          maskChar="_" 
        />
        {error && <p>{error}</p>}
      </Container>
        )
    }
)