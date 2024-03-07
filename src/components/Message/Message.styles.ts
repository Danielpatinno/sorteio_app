import styled, { css } from "styled-components";
import { AlertType } from "./Message";

interface ContainerProps {
  type: AlertType
}

const alertMessageType = {
  success: () => css`
    background-color: green;
    color: white;
  `,
  error: () => css`
    background-color: red;
    color: white;
  `
}

export const Container = styled.div<ContainerProps>`
  ${({ type }) => css`
    gap: 1;
    padding: 5px;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
    font-weight: normal;
    text-align: center;

    ${alertMessageType[type]}
  `}
`
