import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import Head from 'next/head'
import { Box, Flex, Heading, Link } from '@chakra-ui/core'

import Layout from 'components/Layout'
import FormInput from 'components/FormInput'
import Button from 'components/Button'

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  discord: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<SignUpData>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
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
          name="discord"
          placeholder="Discord ID" 
          register={register}
          m="1rem 0"
        />
        <Button 
          submit
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