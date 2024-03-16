import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Container } from './InputMonetario.styles'
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

interface InputMonetarioProps extends NumericFormatProps {
  inputProps: InputProps
}

export default forwardRef<HTMLInputElement, InputMonetarioProps>(
  function InputMonetario(
    { inputProps, ...props }: InputMonetarioProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    return (
      <Container>
        <label htmlFor={inputProps.id}>{inputProps.label}</label>
        <NumericFormat
          {...props}
          getInputRef={ref}
          fixedDecimalScale
          decimalScale={2}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          placeholder="R$ 0,00"
        />
      </Container>
    )
  }
)
