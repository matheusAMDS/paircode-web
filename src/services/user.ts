import api from 'services/api'

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  discord: string;
  bio: string;
  email: string;
}

interface ShowUserResponse {
  user: User;
}

interface UpdateUserParams {
  bio: string;
  avatar: File;
}

class UserService {
  public async me() {
    const { data } = await api.get<ShowUserResponse>('/users/me')

    return data.user
  }

  public async update({ bio, avatar }: UpdateUserParams) {
    const data = new FormData()

    data.append('bio', bio)
    data.append('avatar', avatar)

    await api.put('/users/me', data)
  }
}

export default new UserService()