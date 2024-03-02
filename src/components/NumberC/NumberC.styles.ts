import { styled } from 'styled-components'

export const Container = styled.div``

export const NumberContainer = styled.button<{ isSelected: boolean; isPurchased: boolean }>`
  display: flex;
  font-weight: bold;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  border: 2px solid red;
  width: 90px;
  height: 80px;
  margin: 15px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isPurchased
      ? 'green'
      : props.isSelected
      ? 'blue'
      : '#242424'};
`