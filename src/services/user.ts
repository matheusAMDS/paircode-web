import api from 'services/api'

import { Post } from 'services/post'

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  email: string;
  posts?: Post[];
}

interface ShowUserResponse {
  user: User;
}

export interface NewUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  discord: string;
}

interface UpdateUserParams {
  bio: string;
  avatar: File;
}

class UserService {
  public async me() {
    const token = localStorage.getItem('@token')

    const { data } = await api.get<ShowUserResponse>('/users/me', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    })

    return data.user
  }

  public async create(params: NewUserParams) {
    await api.post('/users', params)
  }

  public async update({ bio, avatar }: UpdateUserParams) {
    const token = localStorage.getItem('@token')
    const data = new FormData()

    data.append('bio', bio)
    data.append('avatar', avatar)

    await api.put('/users/me', data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    })
  }
}

export default new UserService()