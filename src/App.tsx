import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Administration } from './pages/Administration'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

import { AuthProvider } from './context/AuthContext/AuthContext'

import { RequireAuth } from './components/RequireAuth/RequireAuth'

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route 
              path='/' 
              element={<Home/>}
            />

            <Route 
              path='/administration' 
              element={
                <RequireAuth>
                  <Administration />
                </RequireAuth>
              }
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
