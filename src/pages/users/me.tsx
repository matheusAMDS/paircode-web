import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import { 
  Box, 
  useToast, 
  Text,
  Heading, 
  Flex, 
  Avatar,
  Stack,
  Badge
} from '@chakra-ui/core'

import Layout from 'components/Layout'
import PostCard from 'components/PostCard'
import Card from 'components/Card'
import EditUser from 'components/EditUser'

import UserService, { User } from 'services/user'
import PostService, { Post } from 'services/post'

import { AuthContext } from 'contexts/AuthContext'

interface Props {
  user: User;
  posts: Post[];
}

const Me: React.FC<Props> = () => {
  const toast = useToast()
  const router = useRouter()
  const { isLogged } = useContext(AuthContext)
  const [ posts, setPosts ] = useState<Post[]>([])
  const [ user, setUser ] = useState<User>({} as User)

  const deletePost = async (id: number) => {
    await PostService.delete(id)
    setPosts(posts.filter(post => post.id !== id))
    toast({
      title: 'Sucesso',
      description: 'Postagem deletada com sucesso.',
      duration: 3000,
      status: 'success'
    })
  }

  useEffect(() => {
    async function loadData() {
      if (!isLogged) {
        toast({
          title: 'Erro',
          description: 'Usuário não está logado.',
          duration: 3000,
          status: 'error'
        })
        router.push('/signin')
      } else {
        const user = await UserService.me()
        const posts = await PostService.index(user.id)
        
        setPosts(posts)
        setUser(user)
      }
    }
    loadData()
  }, [isLogged])

  return (
    <Layout>
      <Head>
        <title>Meu Perfil | PairCode</title>
      </Head>

      <Card w="full" maxW={900}>
        <Flex flexWrap="wrap"> 
          <Avatar src={user.avatar} w={[170, 180]} h={[170, 180]} mx='auto' />
          <Stack
            mx={8}
            aria-label="user-details"
            w="full" maxW={610}
          >
            <Heading as="h2">
              {user.firstName} {user.lastName}
            </Heading>
            <Box>
              <Badge variant="solid" variantColor="red" mr={4} fontSize={14}>
                {user.email}
              </Badge>
              <Badge variant="solid" variantColor="purple" fontSize={14}>
                {user.discord}
              </Badge>
            </Box>
            <Text fontSize="xl" mt={4}>{user.bio}</Text>
            <EditUser user={user} />
          </Stack>
        </Flex>
      </Card>
      
      <Box as="section" aria-label="user-posts" w="full" my={8}>
        <Heading as="h3" textAlign="center">Minhas postagens</Heading>
        <Flex my={8} w="full" flexWrap="wrap">
          {posts.map(post => (
            <PostCard 
              post={post} 
              key={post.id} 
              forUser
              onClose={() => deletePost(post.id)}
            />
          ))}
        </Flex>
      </Box>
    </Layout>
  )
}

export default Me