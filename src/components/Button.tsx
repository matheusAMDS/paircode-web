import { Button as ChakraButton, ButtonProps } from '@chakra-ui/core'
import { useRouter } from 'next/router'

interface Props extends ButtonProps {
  href?: string;
}

const Button: React.FC<Props> = ({ 
  children, 
  onClick, 
  size, 
  bg, 
  href,
  variant,
  ...rest 
}) => {
  const router = useRouter()

  return (
    <ChakraButton
      variant={"solid" || variant}
      backgroundColor={variant ? undefined : (bg || "blue.400")}
      color="white"
      _hover={{ opacity: 0.9 }}
      onClick={href ? () => router.push(href) : onClick}
      size={size || 'lg'}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}

export default Button