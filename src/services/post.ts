import useSWR from 'swr'

import api from 'services/api'
import { User } from 'services/user'

export interface Post {
  id: number;
  subject: string;
  createdAt: Date;
  user: User;
}

interface PostIndexResponse {
  posts: Post[];
}

export interface NewPostParams {
  subject: string;
}

interface NewPostResponse {
  error?: string;
}

class PostService {
  public async index(userId?: number): Promise<Post[]> {
    const { data } = await api.get<PostIndexResponse>(
      '/posts', 
      userId ? { params: { userId } } : undefined
    )

    return data.posts as Post[]
  }

  public async store(params: NewPostParams): Promise<void> {
    const token = localStorage.getItem('@token')
    
    await api.post<NewPostResponse>('/posts', params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async delete(id: number) {
    const token = localStorage.getItem('@token')

    await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export const usePost = (userId?: number) => {  
  const { data, error } = useSWR('/posts', async () => {
    const { data } = await api.get<PostIndexResponse>('/posts', {
      params: userId ? { userId } : undefined
    })

    return data.posts
  })

  return {
    posts: data,
    loading: !!data && !!error,
    error
  }
}

export default new PostService()