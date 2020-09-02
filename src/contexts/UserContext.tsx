import { createContext, useState, useEffect } from 'react'

import UserService, { User } from 'services/user'

export const UserContext = createContext<User | undefined>({} as User)

export const UserProvider: React.FC = ({ children }) => {
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    UserService.me()
      .then(result => setUser(result))
      .catch(error => setUser(undefined))
  })
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}