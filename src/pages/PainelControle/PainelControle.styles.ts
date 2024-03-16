import { styled } from "styled-components";

export const Container = styled.div`
  width: 900px;
  margin: auto;

  button, input[type='submit'] {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: white;
    align-items: center;
    justify-content: center;
    height: 25px;
    background: #243441;

    &:hover {
    box-shadow:  1px 1px 1px #101010,
             -0px -0px 0px #383835;
    }
  }

  a {
    text-decoration: none;
  }
  

  h1 {
    text-align: center;
  }

  p {
    margin-bottom: 5px;
  }

  @media (max-width: 800px) {
    width: 470px;
  }

  @media (max-width: 500px) {
    max-width: 345px;
  }
`

export const PreviewImageContainer = styled.div`
  max-height: 330px;
  width: 300px;
  margin: auto;


  img {
    width: 300px;
    height: 330px;
  }
`
