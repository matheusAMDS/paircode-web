import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { mutate } from 'swr'
import { 
  Modal, 
  ModalOverlay, 
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  Text,
  Box,
  useToast,
  useDisclosure
} from '@chakra-ui/core'

import Button from 'components/Button'
import FormInput from 'components/FormInput'

import PostService, { NewPostParams } from 'services/post'

import { AuthContext } from 'contexts/AuthContext'

const NewPostModalButton: React.FC = () => {
  const router = useRouter()
  const toast = useToast()
  const { isLogged } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<NewPostParams>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const openNewPostModal = () => {
    if (!isLogged) {
      toast({
        title: 'Erro',
        description: 'Usuário não está logado.',
        duration: 4000,
        isClosable: true,
        status: 'error'
      })
      router.push('/signin')
    } else {
      onOpen()
    }
  }

  const onSubmit = handleSubmit(async values => {
    try {
      await PostService.store(values)
      mutate('/posts')
      toast({
        title: "Sucesso",
        description: "Nova postagem concluída.",
        duration: 5000,
        status: 'success',
        isClosable: true
      })
      onClose()
      router.push('/search')
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message,
        duration: 5000,
        status: 'error',
        isClosable: true
      })
    }
  })

  return (
    <>
      <Button onClick={openNewPostModal} size="md">
        Postar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <Box as="form" onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>Nova Postagem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormInput 
                name="subject" 
                placeholder="Tópico de estudo"
                register={register}
              />
            </ModalBody>

            <ModalFooter>
              <Button size="md" type="submit">Postar</Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}

export default NewPostModalButton