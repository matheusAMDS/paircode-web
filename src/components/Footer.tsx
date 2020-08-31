import { Link, Box } from '@chakra-ui/core'

const Footer = () => {
  return (
    <Box
      backgroundColor="black"
      w="100%"
      p={2}
      textAlign="center"
      color="white"
    >
      Deselvolvido por {""}
      <Link 
        href="https://github.com/matheusAMDS" 
        target="_blank"
        color="blue.400"
      >
        Matheus Andrade
      </Link>
      {""} | 2020
    </Box>
  )
}

export default Footer