import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { ModalSelect } from "../../components/ModalSelect";
import { ActionContainer, ButtonsContainer, CasaContainer, Container, HeaderContainer, NumberContainer, NumbersContainer, ObservationContainer } from "./Home.styles";

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

import Logo from '../../imagens/LogoSorteio.png'

import { Client, useClientsQuery } from "../../hooks/useClientsQuery";
import { useAuth } from "../../hooks/useAuth";
import { ImageRifa } from "../../components/ImageRifa";

export function Home() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openAlertError, setOpenAlertError] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [seeName, setSeeName] = useState<boolean>(false)
  const [seeRifa, setSeeRifa] = useState<boolean>(false)
  const [numbers, setNumbers] = useState<number[]>([])
  const { isAuthenticated, signOut } = useAuth()
  const { data, refetchClients } = useClientsQuery()
  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  useEffect(() => {
    if (data && data.clients) {
      setNumbers([]);
      setDataItems(data?.clients)

      data?.clients.forEach(client => {
        setNumbers(prevNumbers => [...prevNumbers, ...client.numbers]);
      }); 
    }
  }, [data])
  
  const refetch = () => {
    refetchClients()
  }

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

  const abrirModal = () => {
    if(!selectedNumber.length) {
      setOpenAlertError(true)
      
    } else {
      setOpenModal(true)
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <img src={Logo} alt="Logo" 
        />        
      </HeaderContainer>

      {seeRifa && 
        <ImageRifa 
          closeRifa={() => setSeeRifa(false)} 
        />
      }

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
          <button 
            className="btnRifa"
            onClick={() => setSeeRifa(true)}
            >Ver rifa
          </button>
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
         refetch={refetch}
         setState={setDataItems}
           buyNumbers={selectedNumber}
           closeModal={() => {
             setOpenModal(false)
             setSelectedNumber([])
           }}
          />
        }

        {openAlert && 
          <Alert 
            type="error"
            closeAlert={() => setOpenAlert(false)}
            msg='Número indisponivel, selecione outro por favor.'
          />
        }

        {openAlertError && 
          <Alert 
            type="error"
            closeAlert={() => setOpenAlertError(false)}
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

            {seeName && dataItems?.map((cliente) => {
              if (cliente.numbers.includes(n)){
                return <p key={n} className="nameC">{cliente.name}</p>
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
            <button className="btnConfirm">Administração</button> 
          </Link>          
        )}
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