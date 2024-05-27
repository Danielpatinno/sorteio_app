import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

import { useState } from "react"
import { Input } from "../ui/input"

interface ReiniciarSorteioProps {
  handleReiniciar: (numberSelect: number) => void;
}

export function ReiniciarSorteio({ handleReiniciar }: ReiniciarSorteioProps) {
  const [option, setOption] = useState('option-one');
  const [numberSelect, setNumberSelect] = useState<number>(100);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= 100) {
      setNumberSelect(value);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Reiniciar Sorteio</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reiniciar Sorteio</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha uma opção
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <div className="flex text-white items-center space-x-2">
            <label className="flex justify-center">
              <input 
                type="radio" 
                name="options" 
                value="option-one" 
                checked={option === 'option-one'}
                onChange={handleChange}
                className="mr-2"
              />
              Padrão
            </label>
          </div>

          <div className="flex text-white items-center space-x-2">
            <label className="flex justify-center">
              <input 
                type="radio" 
                name="options" 
                value="option-two" 
                checked={option === 'option-two'}
                onChange={handleChange}
                className="mr-2"
              />
              Personalizado
            </label>
          </div>

          {option === 'option-two' ? (
            <Input 
              className="text-white mt-2" 
              type='number' 
              placeholder="100"
              onChange={handleNumberChange}
              max={100}
            />
          ) : (
            <p className="text-white mt-6 text-center">
              100 números
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <Button onClick={() => handleReiniciar(numberSelect)}>Reiniciar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
