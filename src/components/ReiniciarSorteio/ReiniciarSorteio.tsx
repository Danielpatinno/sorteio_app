import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

interface ReiniciarSorteioProps {
  handleReiniciar: () => void
}

export function ReiniciarSorteio({handleReiniciar }: ReiniciarSorteioProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Reiniciar Sorteio</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atenção</AlertDialogTitle>

          <AlertDialogDescription>Deseja reiniciar o sorteio ?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReiniciar}>Reiniciar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}