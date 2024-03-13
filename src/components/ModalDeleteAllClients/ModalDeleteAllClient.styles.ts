import { styled } from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 900px;
  margin: auto;

  @media (max-width: 800px) {
    width: 480px;
  }

  @media (max-width: 500px) {
    width: 320px;
  }
`

export const ContainerModal = styled.div`
  width: 450px;
  height: 245px;
  margin: auto;
  padding: 8px;
  margin-top: 40px;
  background-color: white;
  color: black;

  @media (max-width: 500px) {
    width: 340px;
    height: 190px;
    margin-top: 60px;
  }

  h2 {
    font-weight: normal;
    color: black;
    text-align: left;
    text-align: center;

    @media (max-width: 500px) {
      margin-top: 0px;
      margin-bottom: -10px;      
    }
 
  }

  p {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px;
    font-weight: lighter;
    font-size: x-large;
    text-align: left;
  }

  .pObservation {
    padding: 0px;
    border: none;
    margin-top: -15px;
    font-size: 20px;
  }


`

export const ButtonsContainer = styled.div`
  margin-left: 250px;
  width: 200px;
  display: flex;

  button {
    cursor: pointer;
    width: 80px;
    height: 25px;
    border-radius: 10px;
    margin: auto;
    margin-top: 20px;
    align-items: center;
  }

  .btnDelete {
    &:hover {
      background-color: red;
      color: white;
    }
  }

  .btnCancel {
    &:hover {
      background-color: gray;
      color: white;
    }
  }

  @media (max-width: 500px) {
    margin-left: 150px;
    margin-top: -50px;
  }
  
  @media (max-width: 420px) {
    margin-left: 140px;
    margin-top: -45px;
  }
`