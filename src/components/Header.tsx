import { Flex, Box } from '@chakra-ui/core'
import { useContext } from 'react'

import Logo from 'components/Logo'
import DarkModeButton from 'components/DarkModeButton'
import Button from 'components/Button'
import NewPost from 'components/NewPost'

import { AuthContext } from 'contexts/AuthContext'

const Header: React.FC = () => {
  const Auth = useContext(AuthContext)

  return (
    <Box as="header" w="100%" bg="black" p="8px">
      <Flex
        width="100%"
        maxWidth="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo color="light" />

        <Box>
          {!Auth.isLogged ? (
            <>
              <DarkModeButton />
              <Button mx="5px" size="md" href="/signin">
                Entrar
              </Button>
            </>
          ) : (
            <>
              <DarkModeButton />
              <Button href="/users/me" size="md" mx="5px">Perfil</Button>
              <Button 
                size="md" 
                onClick={Auth.logout} 
                variant="ghost" 
                p={2} color="blue.400"
              >
                Sair
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Header