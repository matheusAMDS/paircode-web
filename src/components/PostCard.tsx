import { Flex, Box, Heading, Text, Tag, CloseButton, Avatar } from '@chakra-ui/core'

import Button from 'components/Button'
import Card from 'components/Card'
import { Post } from 'services/post'

interface Props {
  post: Post;
  forUser?: boolean;
  onClose?: () => void;
}

const PostCard: React.FC<Props> = ({ post, forUser, onClose }) => {
  return (
    <Card w={365} mx={['auto', 'auto', 4, 4]} my={2}>
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
          <Tag color="blue.500">{post.subject}</Tag>
        </Box>          
        <Button color="blue.300" mt={5} w="full">
          Ir para o Discord
        </Button>
      </Flex>
    </Card>
  )
}

export default PostCard