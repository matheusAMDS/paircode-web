import api from 'services/api'
import { User } from 'services/user'

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResponse {
  error?: string;
  token?: string;
  user?: User;
}

class AuthService {
  public async signin(params: SignInParams): Promise<void> {
    const { data } = await api.post<SignInResponse>('/signin', params)
    
    if (data.error)
      throw new Error(data.error)

    const { token, user } = data

    localStorage.setItem('@token', token as string)
    localStorage.setItem('@user', JSON.stringify(user as User))
    api.defaults.headers.Authorization = `Bearer ${token}`
  }

  public logout(): void {
    localStorage.removeItem('@token')
    localStorage.removeItem('@user')
  }
}

export default new AuthService()