import { styled } from "styled-components"

export const Container = styled.div`
  position: absolute;
  width: 470px;
  height: 60vh;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  /* border: 2px solid red; */
  /* background-color: #243441; */

  svg {
    font-size: 30px;
    margin-left: 410px;
    margin-top: 30px;
    z-index: 1;
    color: red;
    background-color: white;
    border-radius: 50%;
  }
`


export const ContainerImage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
  
  img {
    border: 2px solid #0AFFEF;
    border-radius: 10px;
    width: 380px;
  }
`

export const MensagemContainer = styled.div`
  border: 2px solid #0AFFEF;
  width: 300px;
  background-color: #243441;


  p {
    text-align: center;
    color:#0AFFEF;
  }

`
