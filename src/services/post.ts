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
    const { data } = await api.get<PostIndexResponse>('/posts', userId ? (
      {
        params: { userId }
      }
    ) : undefined)

    return data.posts as Post[]
  }

  public async store(params: NewPostParams): Promise<void> {
    await api.post<NewPostResponse>('/posts', params)
  }

  public async delete(id: number) {
    await api.delete(`/posts/${id}`)
  }
}

export default new PostService()