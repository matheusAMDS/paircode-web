import { useContext } from 'react'
import { useRouter } from 'next/router'
import { 
  Flex, 
  Box,
  Heading, 
  Text, 
  Tag, 
  CloseButton, 
  Avatar,
  useToast
} from '@chakra-ui/core'

import Button from 'components/Button'
import Card from 'components/Card'

import { Post } from 'services/post'

import { AuthContext } from 'contexts/AuthContext'

interface Props {
  post: Post;
  forUser?: boolean;
  onClose?: () => void;
}

const PostCard: React.FC<Props> = ({ post, forUser, onClose }) => {
  const router = useRouter()
  const toast = useToast()
  const { isLogged } = useContext(AuthContext)

  const goToWhatsapp = (whatsapp: string) => {
    if (isLogged) {
      window.location.assign(`https://wa.me/${whatsapp}`)
    } else {
      toast({
        title: 'Erro',
        description: 'É preciso estar logado para realizar tal ação.',
        duration: 4000,
        status: 'error',
        isClosable: true
      })
      router.push('/signin')
    }
  }

  return post.user && (
    <Card w={360} mx={['auto', 'auto', 4, 4]} my={2}>
      { forUser && (
        <CloseButton 
          position="absolute" 
          top={0} 
          right={0}
          onClick={onClose}
        />
      )}
      <Flex flexDirection="column" alignItems="center">
        <Avatar 
          src={post.user.avatar} 
          w={150} h={150}
        />
        <Heading as="h3" fontSize="2xl" mt={2}>
          {post.user.firstName} {post.user.lastName}
        </Heading>
        <Text mt={4} fontSize="md">
          {post.user.bio}
        </Text>
        <Box mt={4}>
          <Tag color="blue.500" fontWeight="bold">{post.subject}</Tag>
        </Box>          
        <Button 
          bg="green.400" 
          mt={5} w="full" 
          onClick={() => goToWhatsapp(post.user.whatsapp)}
        >
          Entre em contato
        </Button>
      </Flex>
    </Card>
  )
}

export default PostCard