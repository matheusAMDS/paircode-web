import { Modal as ModalContainer, useDisclosure } from '@chakra-ui/core'

export const useModal = (): UseModalReturn => {
  const modal = useDisclosure()

  return modal
}

interface UseModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface Props {
  modal: UseModalReturn
}

const Modal: React.FC<Props> = ({ children, modal }) => {
  return (
    <ModalContainer>

    </ModalContainer>
  )
}

export default Modal