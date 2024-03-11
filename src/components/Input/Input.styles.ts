import { css, styled } from "styled-components";

interface ContainerProps {
  error?:boolean
}

export const Container = styled.div<ContainerProps>`
  ${({ error }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 123px;

    label {
      margin-bottom: 0.6rem;
      font-size: 1.2rem;
    }

    input {
      height: 1.3rem;
      border-radius: 0.8rem;
      padding: 0.8rem;
      font-size: 1rem;
      border: 1px solid;
      border-color: ${error ? '#d74544' : '#242424'} ;
      outline: none;
      transition: all 0.5s;
      background-color: #242424;
      box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
      transition: 300ms ease-in-out;
      color: white;
    }

    p {
      margin-top: 0.6rem;
      color: #d74544;
    }
  
`}
`