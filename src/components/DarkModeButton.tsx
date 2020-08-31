import { IconButton, useColorMode } from '@chakra-ui/core'

const DarkModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton 
      aria-label="dark-mode-button" 
      variant="solid"
      variantColor={ colorMode === "dark" ? "yellow" : "gray"}
      icon={ colorMode === "dark" ? "sun" : "moon" }
      onClick={toggleColorMode}
    />
  )
}

export default DarkModeButton