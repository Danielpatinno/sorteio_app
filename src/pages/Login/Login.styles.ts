import { styled } from "styled-components"

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 900px;
//   margin: auto;  
//   align-items: center;
//   justify-content: center;
//   height: 60vh;
//   border: 2px solid white;
  
//   h1 {
//     text-align: center;
//     border: 2px solid white;
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     height: 250px;
//     width: 100%;
//     justify-content: center;
//     align-items: center;
//     border: 2px solid red;
//     margin: auto;

//     label {
//       border: 2px solid white;
//       margin-top: 20px;

//     }
//   }

//   button {
//     display: flex;
//     margin: auto;
//     margin-top: 10px;
//     letter-spacing: 0.1em;
//     cursor: pointer;
//     color: white;
//     align-items: center;
//     justify-content: center;
//     height: 35px;
//     width: 120px;
//     border-radius: 50px;
//     background: #243441;
//     box-shadow:  1px 1px 1px #101010,
//              -5px -5px 5px #383838;

//     &:hover {
//       box-shadow:  5px 5px 5px #101010,
//              -5px -5px 5px #383838;
//     }
// }

//   @media (max-width: 800px) {
//     width: 470px;
//   }

//   @media (max-width: 500px) {
//     width: 400px;
//   }
// `

export const InputContainer = styled.div`
    /* border: 2px solid white; */
    width: 500px;



`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 900px;
  margin: auto;
  align-items: center;
  /* margin: auto; */
  padding: 4.0rem;
  height: 60vh;
  /* border: 2px solid red; */

  @media (max-width: 800px) {
     width: 470px;
    }

    @media (max-width: 500px) {
      width: 400px;
    }


`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 100%;

  form {
    margin: auto;
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
  }
`






