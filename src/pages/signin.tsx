import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Heading, Link, useToast } from '@chakra-ui/core'

import Layout from 'components/Layout'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import { SignInParams } from 'services/auth'
import { AuthContext } from 'contexts/AuthContext'

const SignIn: React.FC = () => {
  const router = useRouter()
  const toast = useToast()
  const Auth = useContext(AuthContext)
  const { register, handleSubmit } = useForm<SignInParams>()

  const onSubmit = handleSubmit(async values => {
    try {
      await Auth.signIn(values)
      toast({
        title: "Sucesso",
        description: "Login efetuado com sucesso.",
        duration: 5000,
        status: 'success',
        isClosable: true
      })
      router.push('/search')
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.error,
        duration: 5000,
        status: 'error',
        isClosable: true
      })
    }
  })

  return (
    <Layout>
      <Head>
        <title>Login | PairCode</title>
      </Head>
      <Heading as="h2" mb="32px" fontSize="5xl">
        Entrar
      </Heading>
      <Box 
        as="form" 
        onSubmit={onSubmit}
        w="full"
        maxW="650px"
        textAlign="center"
      >
        <FormInput 
          name="email"
          placeholder="E-Mail"
          register={register}
          m="1rem 0"
          type="email"
        />
        <FormInput 
          name="password"
          placeholder="Senha" 
          register={register}
          m="1rem 0"
          type="password"
        />
        <Button type="submit" size="lg" w="full">
          Login
        </Button>
        
        <Box mt={4}>
          <NextLink href="/signup">
            <Link color="blue.400" fontWeight="bold">
              Ainda não está cadastrado?
            </Link>
          </NextLink>
        </Box>
        
      </Box>
    </Layout>
  )
}

export default SignIn