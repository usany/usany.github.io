import Button from '@mui/material/Button';
import useTexts from 'src/useTexts';

interface Props {
  submit: (event: {}) => void
}

const AddRegisterButton = ({ submit, fromTo }: Props) => {
  const registerButtonText = useTexts('registerButton')
  return (
    <form className='flex justify-center pt-5' id='selection' onSubmit={submit}>
      {fromTo.from?.gmt < fromTo.to?.gmt ?
        <Button variant='outlined' form='selection' type='submit'>{registerButtonText}</Button>
        :
        <Button variant='outlined' form='selection' type='submit' disabled>{registerButtonText}</Button>
      }
    </form>
  )
}

export default AddRegisterButton
