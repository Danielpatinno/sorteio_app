import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Client, useClientsQuery } from "../../hooks/useClientsQuery";

import { Link } from "react-router-dom";

import { BuyNumbers } from "../../components/BuyNumbers";
import { Button } from "../../components/Button";

import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

import { Toaster, toast } from "sonner"

export function Home() {
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [seeName, setSeeName] = useState<boolean>()
  const [numbers, setNumbers] = useState<number[]>([])
  const { isAuthenticated, signOut, isLoadingNumbers, arrayLength, refetchNumberArray } = useAuth()
  const { data, refetchClients } = useClientsQuery()
  const [dataItems, setDataItems] = useState<Client[] | undefined>([]) 

  useEffect(() => {
    refetchClients()
    refetchNumberArray()
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
    <div className="flex flex-col items-center justify-center h-screen m-auto w-11/12">
      <div className="flex justify-center">
        <h1 
          className="text-white text-center text-5xl sm:text-5xl mt-2 md:text-6xl lg:text-7xl xl:text-7xl "
          style={{
            textShadow: '0px 3px 6px #0AFFEF',
            fontFamily: 'Great Vibes'
          }} 
        >
          Sorteio
        </h1>
      </div>
    
     {!isLoadingNumbers && 
      (
      <div className="flex justify-between w-full items-center mt-0">
        <div>
          {isAuthenticated ? 
            (
              <Button
                variantsize="normal"
                labelButton="Sair"
                buttonFunction={handleLogout}
              />
            ) : (
              <Link to='/loginAdm'>
                <Button 
                  variantsize="normal"
                  labelButton="LOGIN"
                />
              </Link>
          )}              
        </div>

        <div>

          {seeName ? (
            <p className="cursor-pointer text-white">
              <IoIosEye 
                size={25} 
                onClick={() => setSeeName(false)}
              />
              Ver nomes
            </p>
          ) : (
            <p className="cursor-pointer text-white">
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
      )}


        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 overflow-y-auto ">
        {Array.from({ length: arrayLength }, (_, i) => i + 1).map((n) => (
          <div key={n} className="flex flex-col items-center h-32">
            <button
              key={n}
              onClick={() => select(n)}
              data-select={selectedNumber.includes(n) && 'select'}
              data-purshased={numbers.includes(n) && 'purshased'}
              className="font-bold items-center justify-center shadow-notPurshased text-numberColor rounded-full hover:shadow-hoverShadow hover:text-white hover:data-[purshased=purshased]:shadow-purshased hover:data-[purshased=purshased]:text-numberSelect hover:data-[select=select]:text-numberSelect  m-2 data-[purshased=purshased]:shadow-purshased data-[purshased=purshased]:text-numberSelect data-[select=select]:shadow-selected data-[select=select]:text-numberSelect"
            >  
              <p className="flex w-20 h-20 lg:h-24 lg:w-24 rounded-full bg-color-black text-bold text-3xl items-center justify-center">{n}</p>
            </button>

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
      
      {!isLoadingNumbers && (
     <div className="flex w-full flex-col h-16">
       <div className="flex justify-center mx-auto">
          {selectedNumber.length ? 
          (
          <BuyNumbers 
            numbers={selectedNumber} 
            resetNumbers={() => setSelectedNumber([])}
            refetch={refetch}
          />
          ):(
            <Button 
              variantsize="large"
              labelButton="Comprar números"
              buttonFunction={() => {toast.error('Selecione algúm número')}}
            />
          )}

        {isAuthenticated && (
          <Link to='/administration'>
            <Button 
              variantsize="large"
              labelButton="Administração"
            />
          </Link>          
        )}
       </div>
        
        <div className="justify-left">
         {arrayLength - numbers.length === 0 ? (
          <p className="text-white">Nenhum número disponivel</p>
         ):(        
          <p className="text-white">Números disponiveis: {arrayLength - numbers.length}</p>
         )}
         
        <Toaster /> 
        </div>
      </div>   
      )}
      
    </div>
  )
}