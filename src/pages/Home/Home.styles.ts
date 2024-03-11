import { css, styled } from "styled-components";
import { preprocess, promise } from "zod";

export const Container = styled.div`
  width: 900px;
  margin: auto;

  h1 {
    text-align: center;
  }

  .verNome {
    display: flex;
    align-items: center;
    height: 10px;
  }

  svg {
    cursor: pointer;
  }

  @media (max-width: 800px) {
    width: 470px;
  }

  @media (max-width: 500px) {
    max-width: 345px;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  .btnLogin {
    cursor: pointer;
    width: 120px;
    height: 25px;
    border-radius: 50px;
    background: #243441;
    box-shadow:  1px 1px 1px #101010,
             -5px -5px 5px #383838;

    a {
      text-decoration: none;
      color: white;
    }

    @media (max-width: 500px) {
      width: 90px;
      height: 22px;
    }   
  } 

  div {

  }

`

export const NumbersContainer = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 2px;
  height: 500px;
  overflow-y: scroll;
  scrollbar-width: thin;
  width: 100%;

  @media (max-width: 800px) {
    margin: auto;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }

`

export const CasaContainer = styled.div`
  
  ${( props ) => css`
    height: 124px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p {
      text-align: center;
    }

    .nameC {
      width: 100%;
      margin-top: 0px;

      @media (max-width: 500px) {
        margin-top: -5px;
        width: 100%;
      }
    }

    @media (max-width: 500px) {

    }
  `}

`

export const NumberContainer = styled.button<{ isselected: boolean; ispurchased: boolean }>`
 ${(props) => css`
    color: ${props.ispurchased ? '#0AFFEF' :props.isselected ? '#fff': '#7C858D'};
    
    display: flex;
    font-weight: bold;
    font-size: 40px;
    align-items: center;
    justify-content: center; 
    border: none;
    /* border: ${props.isselected ? '1px solid #242424' : ''}; */
    border-radius: 50%;
    width: 90px;
    height: 85px;
    margin: 10px;
    cursor: pointer;
    background: linear-gradient(145deg, #273846, #202f3b);
    box-shadow: ${props.isselected ? '5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;' : props.ispurchased ? 'inset 5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;' : '5px 5px 8px #0e151a,-3px -3px 8px #3a5368;'} 

    /* '5px 5px 8px #0e151a,-3px -3px 8px #3a5368; */

    &:hover {
      box-shadow: ${props.isselected ? '' : '5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;'} 
    }

    


    /* box-shadow: ${props.isselected ? '7px 7px 10px #0e0e0e,0px 0px 0px #242421;' :props.ispurchased ? '7px 7px 17px #0e0e0e,-7px -7px 17px #242421;' : '0px 0px 7px #0e0e0e,0px 0px 0px #3a3a3a;' }; */
    /* background-color: ${props.ispurchased ? '#242424' :props.isselected ? '#243441': '#243441'}; */

    @media (max-width:800px) {
      width: 80px;
      height: 80px;
      font-size: 35px;
    }

    @media (max-width: 500px) {
      width: 70px;
      height: 70px;
    }

    p {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
 `}
  
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin: auto;
 
  a {
    text-decoration: none;
    color: white;
    
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
    height: 40px;
    width: 150px;
    border-radius: 50px;
    background: #243441;

    &:hover {
    box-shadow:  1px 1px 1px #101010,
             -5px -5px 5px #383835;
    }
    
}


  @media (max-width: 810px) {
    width: 400px;
  }

  @media (max-width: 500px) {
    max-width: 320px;
  }
`

export const ObservationContainer = styled.div`
 
  p {
    margin-top: -15px;
    display: flex;
    align-items: center;
  }

  .quadrado {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    font-size: 10px;
    align-items: center;
    color: #04D939;
  }

  .disponivel {
    background-color: black;
    border: 1px solid red;
  }

  .indisponivel {
    background-color: #242424;
  }

`