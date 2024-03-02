import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InfoClient } from './components/ModalSelect/ModalSelect'
import { Compradores } from './pages/Compradores'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AuthProvider } from './context/AuthContext/AuthContext'
import { RequireAuth } from './components/RequireAuth/RequireAuth'

const queryClient = new QueryClient()

function App() {
  const [numeros, setNumeros] = useState<InfoClient[]>([])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route 
              path='/' 
              element={<Home state={numeros} setState={setNumeros}/>}
            />

            <Route 
              path='/compradores' 
              element={
                <RequireAuth>
                  <Compradores state={numeros} />
                </RequireAuth>}
            />

            <Route
              path='/loginAdm'
              element={<Login />}
            />
          </Routes>            
        </AuthProvider>
      
      </QueryClientProvider>

    </BrowserRouter>
    
  )
}

export default App
