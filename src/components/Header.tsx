import { Flex,  Box } from '@chakra-ui/core'
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
            <Button mx="5px" size="md" href="/signin">
              Entrar
            </Button>
          ) : (
            <>
              <NewPost />
              <Button mx="5px" size="md" onClick={Auth.logout}>
                Sair
              </Button>
            </>
          )}

          <DarkModeButton />
        </Box>
      </Flex>
    </Box>
  )
}

export default Header