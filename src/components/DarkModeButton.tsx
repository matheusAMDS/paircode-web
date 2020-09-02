import { IconButton, useColorMode } from '@chakra-ui/core'

const DarkModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton 
      aria-label="dark-mode-button" 
      variant="solid"
      bg="gray.100"
      color="black"
      _hover={{ opacity: 0.9 }}
      icon={ colorMode === "dark" ? "sun" : "moon" }
      onClick={toggleColorMode}
    />
  )
}

export default DarkModeButton