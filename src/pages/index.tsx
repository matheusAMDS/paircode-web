import Head from 'next/head'
import Link from 'next/link'
import { Text, Heading } from '@chakra-ui/core'

import Layout from 'components/Layout'
import Logo from 'components/Logo'
import Button from 'components/Button'

const Landing: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>PairCode</title>
      </Head>
      <Heading as="h1" fontSize="6xl" color="blue.400">
        Bem vindo ao PairCode
      </Heading>
      <Text fontSize="3xl">
        Pair Programming orientado aos estudos.
      </Text>
      <Button mt="24px" size="lg" href="/search">
        Procurar parceiro
      </Button>
    </Layout>
  )
}

export default Landing