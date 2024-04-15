import { css, styled } from "styled-components";

export const Container = styled.div`
  width: 900px;
  margin: auto;

  h1 {
    text-align: center;
    margin-bottom: 0px;
  }

  .verNome {
    display: flex;
    align-items: center;
    margin-right: 15px;
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

export const HeaderContainer = styled.div`
  display: flex;
  height: 60px;
  margin-bottom: 10px;

  h1 {
    font-size: 60px;
    text-align: center;
    width: 100%;
    color: #FFF;
    text-shadow: 0px 3px 6px #0AFFEF;
    font-family: 'Great Vibes';
  }

  img {
    margin: auto;
    margin-top: -45px;
    width: 450px;
    height: 180px;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

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
    color: ${props.ispurchased ? '#0AFFEF' :props.isselected ? '#0AFFEF': '#7C858D'};   
    display: flex;
    font-weight: bold;
    font-size: 40px;
    align-items: center;
    justify-content: center; 
    /* border: 2px solid red ; */
    border-radius: 50%;
    width: 90px;
    height: 85px;
    margin: 10px;
    cursor: pointer;
    background: linear-gradient(145deg, #273846, #202f3b);
    box-shadow: ${props.isselected ? '5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;' : props.ispurchased ? 'inset 5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;' : '5px 5px 8px #0e151a,-3px -3px 8px #3a5368;'} 

    &:hover {
      box-shadow: ${props.ispurchased ? '' : '5px 5px 8px #0e151a,-3px -3px 2px #0AFFEF;'};
      color: ${props.ispurchased ? '#0AFFEF' : props.isselected ? '' : '#fff'} ;
    }

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
    color: #0AFFEF;
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
    color: #0AFFEF;
    border: 2px solid #0AFFEF;
  }

  .disponivel {
    background-color: black;
    
  }

`