import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { 
  Box, 
  useToast, 
  Text,
  Heading, 
  Flex, 
  Avatar,
  Stack,
  Badge,
  Spinner
} from '@chakra-ui/core'

import Layout from 'components/Layout'
import PostCard from 'components/PostCard'
import Card from 'components/Card'
import EditUser from 'components/EditUser'

import UserService, { User } from 'services/user'
import PostService, { Post } from 'services/post'

interface Props {
  user: User;
  posts: Post[];
}

const Me: React.FC<Props> = () => {
  const toast = useToast()
  const router = useRouter()
  const { data, error } = useSWR('/users/me', () => UserService.me())

  const deletePost = async (id: number) => {
    await PostService.delete(id)
    mutate('/posts')
    mutate('/users/me')
    toast({
      title: 'Sucesso',
      description: 'Postagem deletada com sucesso.',
      duration: 3000,
      status: 'success'
    })
  }

  useEffect(() => {
    if (error) {
      if (error.response) {
        toast({
          title: 'Erro',
          description: 'O usuário não está logado.',
          duration: 3000,
          status: 'error'
        })
        router.push('/signin')
      } else {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
          duration: 3000,
          status: 'error'
        })
        router.back()
      }
    }
  }, [])

  if (!data)
    return (
      <Layout>
        <Spinner size="xl" />
      </Layout>
    )

  return (
    <Layout>
      <Head>
        <title>Meu Perfil | PairCode</title>
      </Head>

      <Card w="full" maxW={900}>
        <Flex flexWrap="wrap"> 
          <Avatar 
            src={data.avatar} 
            w={[170, 180]} h={[170, 180]} mx='auto'
            borderWidth={0}
          />
          <Stack
            mx={8}
            aria-label="user-details"
            w="full" maxW={610}
          >
            <Heading as="h2">
              {data.firstName} {data.lastName}
            </Heading>
            <Box>
              <Badge variant="solid" variantColor="red" mr={4} fontSize={14} p={1}>
                {data.email}
              </Badge>
              <Badge variant="solid" variantColor="green" fontSize={14} p={1} >
                {data.whatsapp}
              </Badge>
            </Box>
            <Text fontSize="xl" mt={4}>{data.bio}</Text>
            <EditUser user={data} />
          </Stack>
        </Flex>
      </Card>
      
      <Box as="section" aria-label="user-posts" w="full" my={8}>
        <Heading as="h3" textAlign="center">Minhas postagens</Heading>
        <Flex my={8} w="full" flexWrap="wrap">
          {data.posts && data.posts.map(post => (
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