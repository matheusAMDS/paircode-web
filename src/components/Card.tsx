import { PseudoBox, PseudoBoxProps, useColorMode } from '@chakra-ui/core'

const Card: React.FC<PseudoBoxProps> = ({ children, ...props }) => {
  const { colorMode } = useColorMode()
  const cardBgColor = colorMode === 'light' ? 'white' : 'gray.700'

  return (
    <PseudoBox
      bg={cardBgColor}
      borderRadius="md"
      p={5}
      position="relative"
      { ...props }
    >
      {children}
    </PseudoBox>
  )
}

export default Card