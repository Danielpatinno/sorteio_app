import { styled } from "styled-components"

export const InputContainer = styled.div`
  width: 100%;
  /* border: 2px solid red; */
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 900px;
  margin: auto;
  align-items: center;
  padding: 4.0rem;
  height: 60vh;
  /* border: 2px solid white; */

  @media (max-width: 800px) {
    width: 470px;
  }

  @media (max-width: 500px) {
    width: 280px;
    padding: 2.0rem;
    margin: auto;
  }


`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 100%;
  /* border: 2px solid blue; */

  form {
    /* margin: auto; */
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
    height: 35px;
    width: 160px;
    border-radius: 50px;
    background: #243441;
    box-shadow:  1px 1px 1px #101010,
              -5px -5px 5px #383838;

    &:hover {
      box-shadow:  5px 5px 5px #101010,
             -5px -5px 5px #383838;
    }
  }
`

export const  HeaderContainer = styled.div` 
  margin-bottom: 3.2rem;

  h1 {
    margin-bottom: 1.6rem;
    text-align: center;
    color: red;
  }
`
