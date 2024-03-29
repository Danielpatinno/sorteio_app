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
  height: 200px;
  margin: auto;
  padding: 8px;
  margin-top: 40px;
  background-color: white;
  color: black;

  @media (max-width: 500px) {
    width: 340px;
    height: 150px;
    margin-top: 60px;
  }

  h2 {
    font-weight: normal;
    color: black;
    text-align: left;

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
`

export const ButtonsContainer = styled.div`
  margin-left: 245px;
  width: 180px;
  display: flex;

  button {
    cursor: pointer;
    width: 80px;
    /* margin: auto; */
    height: 25px;
    border-radius: 10px;
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
    margin-left: 100px;
    margin-top: -25px;
  }

  @media (max-width: 380px) {
    margin-left: 170px;
  }

`