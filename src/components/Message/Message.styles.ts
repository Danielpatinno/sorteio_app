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
    height: 35px;
    border-radius: 5px;
    margin-top: 10px;
    font-weight: normal;
    text-align: center;

    p {
      margin-top: -7px;
    }

    ${alertMessageType[type]}
  `}
`
