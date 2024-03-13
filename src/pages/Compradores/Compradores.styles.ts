import { styled } from 'styled-components'

export const Container = styled.div`
  width: 900px;
  margin: auto;

  h1 {
    text-align: center;
  }

  @media (max-width: 800px) {
    width: 450px;
  }

  @media (max-width: 500px) {
    width: 365px;
  }

  button {
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
`

export const ClientContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  table {
    margin: auto;
    width: 100%;
    
    th {
      background-color: #494949;
      padding: 5px;
      text-align: left;
    }

    td {
      border: 1px solid #494985;
      padding: 8px;
      text-align: left;
    }

    .tdName {
      width: 30%;
    }
    
    .tdPhone {
      width: 35%;

      @media (max-width: 800px) {
        font-size: 15px;
      }

      @media (max-width: 500px) {
        font-size: 14px;
        width: 47%;
      }
    }

    .tdNumbers {
      width: 35%;
    }

    .action {
      display: flex;
      border: none;
    }
  }

  .btnAlterar {
    width: 100px;
  }

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`