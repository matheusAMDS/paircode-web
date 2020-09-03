import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Box, Flex, Heading, Link, useToast } from '@chakra-ui/core'

import Layout from 'components/Layout'
import FormInput from 'components/FormInput'
import Button from 'components/Button'

import UserService, { NewUserParams } from 'services/user'

const SignUp: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const { register, handleSubmit } = useForm<NewUserParams>()

  const onSubmit = handleSubmit(async data => {
    try {
      await UserService.create(data)
      toast({
        title: 'Sucesso',
        description: 'Usuário cadastrado com sucesso.',
        status: 'success',
        isClosable: true,
        duration: 4000
      })
      router.push('/signin')
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.response.data.error,
        status: 'error',
        isClosable: true,
        duration: 4000
      })
    }
  })

  return (
    <Layout>
      <Head>
        <title>Cadastro | PairCode</title>
      </Head>
      <Heading as="h2" mb="32px" fontSize="5xl">
        Cadastro
      </Heading>
      <Box 
        as="form" 
        onSubmit={onSubmit}
        w="full"
        maxW="670px"
        textAlign="center"
      >
        <Flex justifyContent="space-between">
          <FormInput 
            name="firstName"
            placeholder="Nome"
            register={register}
            m="0 0.5rem 0 0"
          />
          <FormInput 
            name="lastName"
            placeholder="Sobrenome"
            register={register}
            m="0 0 0 0.5rem"
          />
        </Flex>
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
        <FormInput 
          name="whatsapp"
          placeholder="Whatsapp (EX. +5599999999999)" 
          register={register}
          m="1rem 0"
        />
        <Button 
          type="submit"
          size="lg"
          w="full"
        >
          Cadastrar
        </Button>
        
        <Box mt={4}>
          <NextLink href="/signin">
            <Link color="blue.400" fontWeight="bold">
              Já possui um cadastro?
            </Link>
          </NextLink>
        </Box>
        
      </Box>
    </Layout>
  )
}

export default SignUp