import { css, styled } from "styled-components";

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

  @media (max-width: 500px) {
    width: 330px;
    margin: auto;
    margin-left: 10px;
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

    @media (max-width: 500px) {
      width: 100px;
    }
  }

   .btnVerMais {
     margin-bottom: 5px;
     margin-top: 5px;
   }

   .btnConfirm {
      margin-left: 20px;
      height: 30px;

      @media (max-width: 500px) {
         margin-left: 30px;
      }
   }

   .btnCancel {
      position: absolute;
      right: 82px;
      height: 30px;
      bottom: 66px;

      @media (max-width: 500px) {
        right: 50px;
      }
   }
`

const exibirType = {
  default: () => css`
    display: flex;
  `,
  secondary: () => css`
    display: grid; 
    position: absolute;
    top: 55px;
    background-color: #243441;
    border-radius: 10px;
    padding: 5px;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 1px;
    overflow-y: scroll;
    scrollbar-width: thin;
  `
}


export const NumberContainer = styled.div<{verTodos: boolean}>`
  ${({ verTodos }) => css`
    height: ${verTodos ? '170' : '70px'};
    max-width: 340px;
    justify-content: center;
    align-items: center;
    
    ${exibirType[verTodos ? 'secondary' : 'default']}

    p {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #242424;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 10px;
      margin: auto;
      border: 2px solid #243441;
      color: #0AFFEF;
      font-size: 35px;
      font-weight: bold;
      box-shadow: inset 5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;
    }  
  `}

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

    @media (max-width: 500px) {
      width: 270px;
      padding: 8px;
    }
  }
`

