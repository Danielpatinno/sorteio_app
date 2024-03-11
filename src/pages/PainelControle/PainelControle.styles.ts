import { styled } from "styled-components";

export const Container = styled.div`
  width: 900px;
  margin: auto;


  h1 {
    text-align: center;
  }

  @media (max-width: 800px) {
    width: 470px;
  }

  @media (max-width: 500px) {
    max-width: 345px;
  }
`
