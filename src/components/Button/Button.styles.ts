import { css, styled } from "styled-components";

export type variantSizes = 'normal' | 'small' | 'large'

interface ButtonContainerProps {
  variantsize: variantSizes
}

const buttonVariants = {
  normal: () => css`
    height: 30px;
    width: 130px;
  `,
  small: () => css`
    height: 25px;
    width: 100px;
    margin: auto;
  `,
  large:() => css`
    height: 30px;
    width: 150px;
  `
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  ${({ variantsize }) => css`
    cursor: pointer;
    color: #0AFFEF;
    border-radius: 10px;
    background: #243441;
    margin-top: 5px;
    margin-bottom: -5px;
    box-shadow:  1px 1px 1px #101010,
          -2px -2px 2px #383838;

    ${buttonVariants[variantsize]}

    a {
      text-decoration: none;
      color: #0AFFEF;
    }

    &:hover {
      transition: 0.8s;
      box-shadow:  1px 1px 1px #101010,
          -2px -2px 2px #0AFFEF;
          background: #243438;
    }
  `}
`
