import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
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

const NewPostModalButton: React.FC = () => {
  const router = useRouter()
  const toast = useToast()
  const { register, handleSubmit } = useForm<NewPostParams>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const onSubmit = handleSubmit(async values => {
    try {
      await PostService.store(values)
      onClose()
      toast({
        title: "Sucesso",
        description: "Nova postagem concluída.",
        duration: 5000,
        status: 'success',
        isClosable: true
      })
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
      <Button onClick={onOpen} size="md">
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
              <Button size="md" submit>Postar</Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}

export default NewPostModalButton