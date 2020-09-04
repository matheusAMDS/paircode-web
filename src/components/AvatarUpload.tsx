import { Box } from '@chakra-ui/core'
import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  onChange: (name: string, value: File) => void;
  name: string;
  defaultUrl?: string;
  register?: (arg: any) => void;
}

const Upload: React.FC<Props> = ({ defaultUrl, register, onChange, name }) => {
  const [ avatarUrl, setAvatarUrl ] = useState(defaultUrl || '')
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
    <Box 
      {...getRootProps()} 
      w={180} h={180} 
      borderWidth={1}
      borderStyle="solid" 
      borderRadius="50%"
      mx="auto"
      backgroundImage={`url(${avatarUrl})`}
      backgroundPosition="center"
      backgroundSize='cover'
      backgroundRepeat="no-repeat"
      cursor="pointer"
    >
      <input 
        {...getInputProps()} 
        name={name}
      />
    </Box>
  )
}

export default Upload