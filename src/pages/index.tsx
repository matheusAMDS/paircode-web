import Head from 'next/head'
import { Text, Heading } from '@chakra-ui/core'

import Layout from 'components/Layout'
import Button from 'components/Button'

const Landing: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>PairCode</title>
      </Head>
      <Heading 
        as="h1" mb={4}
        fontSize="6xl" 
        color="blue.400" 
        textAlign="center" 
      >
        Bem vindo ao PairCode
      </Heading>
      <Text fontSize="3xl" maxW={800} textAlign="center">
        Pair Programming orientado aos estudos. 
        Encontre alguém disposto a aprender junto com você.
      </Text>
      <Button mt="24px" size="lg" href="/search">
        Procurar parceiro
      </Button>
    </Layout>
  )
}

export default Landing