import { styled } from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 900px;
  margin: auto;
  margin-top: auto;

  @media (max-width: 800px) {
    width: 480px;
  }

`

export const ContainerModal = styled.div`
  width: 450px;
  height: 200px;
  margin: auto;
  padding: 8px;
  margin-top: 40px;
  background-color: white;
  color: black;

  h2 {
    font-weight: normal;
    color: black;
    text-align: left;
  }

  p {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px;
    font-weight: lighter;
    font-size: x-large;
    text-align: left;
  }
`

export const ButtonsContainer = styled.div`
  margin-left: 280px;

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
`