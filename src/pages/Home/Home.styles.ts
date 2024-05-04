import { css, styled } from "styled-components";

export const NumberContainer = styled.button<{ isselected: boolean; ispurchased: boolean }>`
 ${(props) => css`
    color: ${props.ispurchased ? '#0AFFEF' :props.isselected ? '#0AFFEF': '#7C858D'};   
    display: flex;
    font-weight: bold;
    font-size: 40px;
    align-items: center;
    justify-content: center;
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