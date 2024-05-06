import { 
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"

import { SORTEIO_SESSION_KEY } from "../../constants/storage"
import { useSignIn } from "../../hooks/useSignIn"

interface Adm {
  _id: number
  name: string
  email: string
}

interface SignInAdm {
  email: string
  password: string
}

interface Session {
  adm: Adm
  token: string
}

interface AuthContextType {
  adm?: Adm
  isAuthenticated: boolean
  admId: string | undefined
  signIn: (adm: SignInAdm) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const [ idSession, setIdSession ] = useState<string>()
  const signInMutation = useSignIn()

  const [session, setSession] = useState<Session | null>(() => {
    const localSession = localStorage.getItem(SORTEIO_SESSION_KEY)

    if(localSession) {
      return JSON.parse(localSession)
    }

    return null
  })

  useEffect(() => {
    const _idLocalStorage = localStorage.getItem(SORTEIO_SESSION_KEY)
    
    if(_idLocalStorage) {
      const { _id } = JSON.parse(_idLocalStorage)
      setIdSession(_id)
    }

  }, [])

  const signIn = async (adm: SignInAdm): Promise<void> => {
    await signInMutation.mutateAsync(adm, {
      onSuccess: (session) => {
        setSession(session)

        localStorage.setItem(
          SORTEIO_SESSION_KEY,
          JSON.stringify(session)
        )
      }
    })
    
  }   

  const signOut = async (): Promise<void> => {
    try {
      localStorage.removeItem(SORTEIO_SESSION_KEY)
      setSession(null)
    } catch (error) {
      console.log('Erro ao fazer logout:' + error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session),
        adm: session?.adm,
        admId: idSession,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}