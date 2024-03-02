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
      /* border: 1px solid #dddddd; */
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
    }

    .tdNumbers {
      width: 35%;
    }

    .action {
        display: flex;
        border: none;
    }

    @media (max-width: 800px) {
       
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