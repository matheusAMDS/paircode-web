import { useForm } from 'react-hook-form'
import { 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  Box,
  Textarea,
  useDisclosure
} from '@chakra-ui/core'

import Button from 'components/Button'
import AvatarUpload from 'components/AvatarUpload'
import UserService, { User } from 'services/user'

interface Props {
  user: User;
}

interface EditUserFormParams {
  avatar: File;
  bio: string;
}

const EditUser: React.FC<Props> = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { register, handleSubmit, setValue } = useForm<EditUserFormParams>()

  const onSubmit = handleSubmit(async values => {
    try {
      await UserService.update(values)
      onClose()
    } catch (error) {
      alert(error.message)
    }
  })

  return (
    <>
      <Button onClick={onOpen} w={100} mt={8}>
        Editar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <Box as="form" onSubmit={onSubmit}>
          <ModalContent w={800}>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AvatarUpload
                name="avatar"
                register={register}
                defaultUrl={user.avatar}
                onChange={setValue}
              />
              <Textarea 
                mt={8} 
                name="bio"
                ref={register}
                defaultValue={user.bio} 
              />
            </ModalBody>

            <ModalFooter>
              <Button size="md" type="submit">Concluir</Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}

export default EditUser