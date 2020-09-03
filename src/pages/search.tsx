import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { GetServerSideProps } from 'next'
import { 
  Flex, 
  Box, 
  Heading, 
  Input, 
  Image, 
  Text,
  Tag,
  Divider,
} from '@chakra-ui/core'

import Layout from 'components/Layout'
import Button from 'components/Button'
import PostCard from 'components/PostCard'
import NewPost from 'components/NewPost'

import PostService, { Post, usePost } from 'services/post'

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await PostService.index()
  
  return {
    props: {
      posts
    }
  }
}

const SearchPartners: React.FC<Props> = ({ posts }) => {
  const { data } = useSWR('/posts', () => PostService.index(), { initialData: posts })

  return (
    <Layout>
      <Head>
        <title>Encontre um parceiro | PairCode</title>
      </Head>
      
      <Box>
        <Heading>Encontre um parceiro ou <NewPost /></Heading>
        
      </Box>

      <Flex my={8} w="full" flexWrap="wrap">
        { data && data.map(post => ( 
          <PostCard post={post} key={post.id} />
        ))}
      </Flex>
    </Layout>
  )
  
}

export default SearchPartners
