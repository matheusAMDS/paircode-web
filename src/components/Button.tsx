import { Button as ChakraButton } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'

interface Props {
  submit?: boolean;
  onClick?: () => void;
  m?: string | number;
  mt?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mx?: string | number;
  my?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  w?: string | number;
  color?: string;
  href?: string;
}

const Button: React.FC<Props> = ({ children, onClick, size, submit, w, color, href, ...rest }) => {
  const router = useRouter()

  return (
    <ChakraButton
      backgroundColor={color || "blue.400"}
      color="white"
      _hover={{ opacity: 0.9 }}
      onClick={href ? () => router.push(href) : onClick}
      size={ size || 'lg' }
      type={ submit ? "submit" : undefined}
      w={w}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}

export default Button