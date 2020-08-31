import { Box, Flex, useColorMode } from '@chakra-ui/core'

import Header from 'components/Header'
import Footer from 'components/Footer'

const Layout: React.FC = ({ children }) => {
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ?  'gray.100' : undefined

  return (
    <Box backgroundColor={bgColor}>
      <Header />
      <Flex 
        w="100%"
        h="full"
        minH="85vh"
        maxW="1200px"
        mx="auto"
        py={16}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        
      >
        { children }
      </Flex>
      <Footer />
    </Box>
  )
}

export default Layout