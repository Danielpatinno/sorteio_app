import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  z-index: 1;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 450px;
  margin-left: 230px;
  background: white;
  background-color: #494949;
  color: white;
  border-radius: 15px;

  h3 {
    margin-top: -60px;
  }

  p {
    margin-top: -5px;
    color: white;
  }

  @media (max-width:900px) {
    margin-left: 40px;
  }

  button {
    display: flex;
    margin: auto;
    margin-top: 10px;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: white;
    align-items: center;
    justify-content: center;
    width: 120px;
    border-radius: 50px;
    background: #243441;

    &:hover {
    box-shadow:  1px 1px 1px #101010,
             -5px -5px 5px #383835;
    }
  }

   .btnConfirm {
      margin-left: 20px;
      height: 30px;
   }

   .btnCancel {
      position: absolute;
      right: 82px;
      height: 30px;
      bottom: 66px;
   }

  @media (max-width:520px) {
    margin-left: 20px;
  }
`

export const NumberContainer = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #242424;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
    margin-top: -10px;
    border: 2px solid #243441;
    color: white;
    font-size: 35px;
    font-weight: bold;
  }
`

export const InputContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: -30px;

  input {
    width: 300px;
    padding: 10px;
    border-radius: 10px;
  }
`

