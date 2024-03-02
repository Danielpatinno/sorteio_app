import { useState } from "react"

export function useDrawNumber() {
    const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);

    const sortearNumero = () => {
        const numeros: number[] = [];
        for (let i = 1; i <= 100; i++) {
            numeros.push(i);
        }
        const indiceSorteado: number = Math.floor(Math.random() * numeros.length);
        const numeroSorteado: number = numeros[indiceSorteado];
        setNumeroSorteado(numeroSorteado);
    };

    return { numeroSorteado, sortearNumero };
}