import { Modal as ModalContainer, useDisclosure } from '@chakra-ui/core'

interface UseModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface Props {
  modal: UseModalReturn
}

export const useModal = (): UseModalReturn => {
  const modal = useDisclosure()

  return modal
}

const Modal: React.FC<Props> = ({ children, modal }) => {
  return (
    <ModalContainer isOpen={modal.isOpen}>
      {children}
    </ModalContainer>
  )
}

export default Modal