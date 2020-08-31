import { Input, FormControl } from '@chakra-ui/core'

interface Props {
  name: string; 
  placeholder: string;
  register: () => void;
  m?: string;
  type?: string;
}

const FormInput: React.FC<Props> = ({ name, placeholder, register, m, type }) => {
  return (
    <FormControl isRequired w="full" m={m}>
      <Input 
        name={name}
        placeholder={placeholder} 
        variant="outline" 
        ref={register}
        size="lg"
        type={type}
      />
    </FormControl>
  )
}

export default FormInput