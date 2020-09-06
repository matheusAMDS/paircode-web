import { Box, Avatar, IconButton, Icon, Text } from '@chakra-ui/core'
import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import Button from 'components/Button'

interface Props {
  onChange: (name: string, value: File) => void;
  name: string;
  defaultUrl?: string;
  register?: (arg: any) => void;
}

const Upload: React.FC<Props> = ({ defaultUrl, register, onChange, name }) => {
  const [ avatarUrl, setAvatarUrl ] = useState<string | null>(null)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const fileUrl = URL.createObjectURL(file)

    setAvatarUrl(fileUrl)
    onChange(name, file)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    if (register)
      register(name)
  }, [])

  return (
    <Box w={180} h={180} mx="auto" position="relative" >
      <Avatar
        borderWidth={0}
        mx="auto"
        src={avatarUrl || defaultUrl}
        w="full" h="full"
      />
      <Button 
        position="absolute" 
        aria-label="edit-user-avatar" 
        leftIcon="edit"
        bottom={0}
        right={0}
        pr={0} pl={3}
        {...getRootProps()}
        _hover={{ opacity: 1}}
      >
        <input
          {...getInputProps()} 
          name={name}
        />
      </Button>
    </Box>
  )
}

export default Upload