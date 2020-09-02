import { createContext, useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'

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
  const [ isLogged, setIsLogged ] = useState(!!localStorage.getItem('@token'))

  useEffect(() => {
    const actualToken = localStorage.getItem('@token')

    if (!actualToken) {
      setIsLogged(false)
    } else {
      const decoded = jwt.decode(actualToken) as Decoded
      
      setIsLogged(decoded.exp * 1000 > Date.now())
    }
  })

  return (
    <AuthContext.Provider value={{
      isLogged,
      signIn: async (params) => {
        await AuthService.signin(params)
        setIsLogged(true)
      },
      logout: () => {
        AuthService.logout()
        setIsLogged(false)
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}