import { Text, Flex } from '@chakra-ui/core'
import Link from 'next/link'

interface Props {
  color?: "light" | "dark";
}

const Logo: React.FC<Props> = ({ color }) => {
  return (
    <Link href="/">
      <Flex 
        alignItems="center" 
        flexWrap="nowrap" 
        fontSize="30px" 
        fontWeight="bold"
        cursor="pointer"
      >
        <Text color="blue.400">Pair</Text>
        <Text color={ color === "light" ? "white" : "black"}>
          Code
        </Text>
      </Flex>
    </Link>
  )
}

export default Logo