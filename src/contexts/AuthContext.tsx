import { createContext, useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'

import api from 'services/api'
import AuthService, { SignInParams } from 'services/auth'

interface Auth {
  isLogged: boolean;
  signIn: (params: SignInParams) => Promise<void>;
  logout: () => void;
}

interface Decoded {
  id: number;
  sub: string;
  exp: number;
  iat: number;
}

export const AuthContext = createContext({} as Auth)

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const [ isLogged, setIsLogged ] = useState(!!localStorage.getItem('@token'))

  useEffect(() => {
    const actualToken = localStorage.getItem('@token')

    if (!actualToken) {
      setIsLogged(false)
    } else {
      const decoded = jwt.decode(actualToken) as Decoded
      const tokenIsValid = decoded.exp * 1000 > Date.now()
      console.log(decoded.exp* 1000, Date.now())
      console.log(tokenIsValid)
      setIsLogged(tokenIsValid)
      api.defaults.headers.Authorization = `Bearer ${actualToken}`
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isLogged,
      signIn: AuthService.signin,
      logout: () => {
        AuthService.logout()
        setIsLogged(false)
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}