import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: fixed;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  height: 300px;
  width: 350px;
  background: white;
  background-color: #494949;
  color: white;
  z-index: 9999;

  h3 {
    margin-top: 5px;
  }

  p {
    margin-top: -10px;
  }

  button {
    display: flex;
    margin-top: 10px;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: white;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 160px;
    border-radius: 50px;
    background: #243441;

    &:hover {
    box-shadow:  1px 1px 1px #101010,
             -5px -5px 5px #383835;
    }
  }
`

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const NumberContainer = styled.div` 
  display: flex;
  position: relative;
  height: 70px;
  margin-top: 20px;

  div {
    display: flex;

    svg {
      color: red;
      position: relative;
      top: 55px;
      right: 34px;
      cursor: pointer;
    }

  }

  .numberP {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 0px;
    border: 2px solid blue;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
`

export const LabelContainer = styled.label`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
    width: 300px;
    padding: 5px;
    border-radius: 10px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;

  button {
    display: flex;
    margin: auto;
    margin-top: 10px;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: white;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 160px;
    border-radius: 50px;
    background: #243441;

    &:hover {
    box-shadow:  1px 1px 1px #101010,
             -5px -5px 5px #383835;
    }
  }

  .btnCancel {
    
  }

  .btnConfirm {
     background-color: green;
  }
`
