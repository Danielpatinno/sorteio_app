import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { ModalSelect } from "../../components/ModalSelect";
import { ActionContainer, ButtonsContainer, CasaContainer, Container, NumberContainer, NumbersContainer, ObservationContainer } from "./Home.styles";

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

import { useClientsQuery } from "../../hooks/useClientsQuery";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openAlertError, setOpenAlertError] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [seeName, setSeeName] = useState<boolean>(false)
  
  const { isAuthenticated, signOut } = useAuth()


  const { data } = useClientsQuery()

  const select = (n: number) => {
    if (numbers.includes(n)) {
      setOpenAlert(true)
      return
    }    
    setSelectedNumber((prev) => {
      const isNumberSelected = prev.includes(n)

      return isNumberSelected 
        ? prev?.filter((num) => num !== n) 
        : [...prev, n]
    })
  };

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  const closeAlert = () => {
    setOpenAlert(false)
  }

  const abrirModal = () => {
    if(!selectedNumber.length) {
      setOpenAlertError(true)
      
    } else {
      setOpenModal(true)
    }
  }

  const closeAlertError = () => {
    setOpenAlertError(false)
  }

  const closeModal = () => {
    setOpenModal(false)
    setSelectedNumber([])
    window.location.reload()
  }


  const [numbers, setNumbers] = useState<number[]>([])

  useEffect(() => {
    if (data && data.clients) {
      setNumbers([]);

      data.clients.forEach(client => {
        setNumbers(prevNumbers => [...prevNumbers, ...client.numbers]);
      }); 
    }
  }, [data]);

  return (
    <Container>
      <h1>Sorteio</h1> 
      <ActionContainer>
        

        <div>
          {isAuthenticated ? 
            (
              <button 
                className="btnLogin"
                onClick={handleLogout}
                >Sair
              </button>
            ) : (
              <Link to='/loginAdm'>
                <button 
                  className="btnLogin"
                >LOGIN
                </button>
              </Link>
          )}              
        </div>

        <div>
          {seeName ? (
            <p className="verNome">
              <IoIosEye 
                size={25} 
                onClick={() => setSeeName(false)}
              />
              Ver nomes
            </p>
          ) : (
            <p className="verNome">
              <IoIosEyeOff 
                size={25} 
                onClick={() => setSeeName(true)}
              />
              Ver nomes
            </p>
          )
          }          
        </div>
      </ActionContainer>
       {openModal && 
         <ModalSelect
           buyNumbers={selectedNumber}
           closeModal={closeModal}
          />
        }

        {openAlert && 
          <Alert 
            type="error"
            closeAlert={closeAlert}
            msg='Número indisponivel, selecione outro por favor.'
          />
        }

        {openAlertError && 
          <Alert 
            type="error"
            closeAlert={closeAlertError}
            msg='Por favor, selecione os números.'
          />
        }

       <NumbersContainer>
        {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
          <CasaContainer key={n}>
            <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
              <NumberContainer 
                key={n} 
                ispurchased={
                  numbers.includes(n)
                }
                isselected={selectedNumber.includes(n)}
                onClick={() => select(n)}>
                  <p>{n}</p>
              </NumberContainer>              
            </StyleSheetManager>

            {seeName && data?.clients.map((cliente) => {
              if (cliente.numbers.includes(n)){
                return <p className="nameC">{cliente.name}</p>
              } 
            })}
          </CasaContainer>
        )
        )}
       </NumbersContainer>

       <ButtonsContainer>
       <button 
         className="btnConfirm"
         onClick={abrirModal}
         >Comprar números
       </button>

        
        {isAuthenticated && (
          <Link to='/compradores'>
            <button className="btnConfirm">Ver compradores</button> 
          </Link>          
        )}
        <Link to='/compradores'>
            <button className="btnConfirm">Ver compradores</button> 
        </Link> 

               
       </ButtonsContainer>


        <ObservationContainer>
          <h3>Observação</h3>
          <p>
            <span className="quadrado indisponivel">0</span>
            Números indisponiveis
          </p>
          <p>Números disponiveis: {100 - numbers.length}</p>
        </ObservationContainer>

       
    </Container>
  )
}