import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { ModalSelect } from "../../components/ModalSelect";
import { ActionContainer, ButtonsContainer, CasaContainer, Container, HeaderContainer, NumberContainer, NumbersContainer, ObservationContainer } from "./Home.styles";

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"

import Logo from '../../imagens/LogoSorteio.png'

import { Client, useClientsQuery } from "../../hooks/useClientsQuery";
import { useAuth } from "../../hooks/useAuth";
import { ImageRifa } from "../../components/ImageRifa";
import { Button } from "../../components/Button";

export function Home() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openAlertError, setOpenAlertError] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [seeName, setSeeName] = useState<boolean>()
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
    <div className=" m-auto w-10/12">
      <div className="flex justify-center">
        <h1 
          className="text-white text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-2"
          style={{ 
            textShadow: '0px 3px 6px #0AFFEF',
            fontFamily: 'Great Vibes'
          }} 
        >
          Rifas Tupperware
        </h1>
      </div>


      {seeRifa && 
        <ImageRifa 
          closeRifa={() => setSeeRifa(false)} 
        />
      }

      <ActionContainer>
        
        <div>
          {isAuthenticated ? 
            (
              <Button
                variantSize="normal"
                labelButton="Sair"
                buttonFunction={handleLogout}
              />
            ) : (
              <Link to='/loginAdm'>
                <Button 
                  variantSize="normal"
                  labelButton="LOGIN"
                />
              </Link>
          )}              
        </div>

        <div>

          {seeName ? (
            <p className="verNome text-white">
              <IoIosEye 
                size={25} 
                onClick={() => setSeeName(false)}
              />
              Ver nomes
            </p>
          ) : (
            <p className="verNome text-white">
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
                  <p className='bg-color-black flex' >{n}</p>
              </NumberContainer>              
            </StyleSheetManager>

            {seeName && dataItems?.map((cliente) => {
              if (cliente.numbers.includes(n)){
                return <p key={n} className="nameC text-white">{cliente.name}</p>
              } 
            })}
            {seeName && <p className="text-white">Daniel</p>}
          </CasaContainer>
        )
        )}
       </NumbersContainer>

       <div className="flex justify-around m-auto">
        <Button 
          variantSize="large"
          labelButton="Comprar números"
          buttonFunction={abrirModal}
        />

        {isAuthenticated && (
          <Link to='/compradores'>
            <Button 
              variantSize="large"
              labelButton="Administração"
            />
          </Link>          
        )}
       </div>

        <ObservationContainer className="text-white">
          <h3 className="">Observação</h3>
          <p>Números disponiveis: {100 - numbers.length}</p>
        </ObservationContainer>
    </div>
  )
}