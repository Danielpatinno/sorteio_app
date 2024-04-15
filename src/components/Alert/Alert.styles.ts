import { css, styled } from 'styled-components'

export type typeMessage = 'success' | 'error'

interface AlertPropsContainer {
  type: typeMessage
}

export const Container = styled.div<AlertPropsContainer>`
${({ type }) => css`
  /* display: flex;
  flex-direction: column;
  position: fixed;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px; */
  /* background-color: white; */
  /* border: 2px solid ${type === 'error' ? 'red' : 'green'}; */
  /* color: ${type === 'error' ? 'red' : 'black'}; */

  h3 {
    /* margin-bottom: -10px;
    margin-top: -5px;
    border-bottom: 2px solid black; */
  }    
`}

`