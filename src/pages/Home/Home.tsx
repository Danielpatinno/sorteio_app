import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Client, useClientsQuery } from "../../hooks/useClientsQuery";

import { Link } from "react-router-dom";

import { BuyNumbers } from "../../components/BuyNumbers";
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { Button } from "../../components/Button";

import { NumberContainer } from "./Home.styles";
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

import { Toaster, toast } from "sonner"

export function Home() {
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [seeName, setSeeName] = useState<boolean>()
  const [numbers, setNumbers] = useState<number[]>([])
  const { isAuthenticated, signOut } = useAuth()
  const { data, refetchClients } = useClientsQuery()
  const [dataItems, setDataItems] = useState<Client[] | undefined>([])

  useEffect(() => {
    refetchClients()
  }, [])

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
      toast.error('Número indisponivel.')
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

  return (
    <div className="m-auto w-10/12 bg-black h-screen">
      <div className="flex justify-center ">
        <h1 
          className="text-white text-center text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl mt-2"
          style={{ 
            textShadow: '0px 3px 6px #0AFFEF',
            fontFamily: 'Great Vibes'
          }} 
        >
          Rifas Tupperware
        </h1>
      </div>

      <div className="flex justify-between w-full items-center">
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
        </div>

       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 overflow-y-auto h-500">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
          <div className="flex flex-col items-center h-32">
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
                const firstName = cliente.name.split(' ')[0];
                return <p key={n} className="text-white">{firstName}</p>
              } 
            })}
            </div>
        )
        )}
        </div>

       <div className="flex justify-around m-auto">
          <BuyNumbers 
            numbers={selectedNumber} 
            resetNumbers={() => setSelectedNumber([])}
            refetch={refetch}
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
       
        <p className="text-white">Números disponiveis: {100 - numbers.length}</p>
        <Toaster />
    </div>
  )
}