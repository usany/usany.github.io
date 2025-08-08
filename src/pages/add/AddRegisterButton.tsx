import Button from '@mui/material/Button'
import { useSelectors } from 'src/hooks/useSelectors'
import useTexts from 'src/useTexts'

interface Props {
  submit: (event: {}) => void
}

const AddRegisterButton = ({ submit, fromTo, enableRegister }: Props) => {
  const registerButtonText = useTexts('registerButton')
  const onLine = useSelectors((state) => state.onLine.value)
  return (
    <form className="flex justify-center pt-5" id="selection" onSubmit={submit}>
      {enableRegister &&
        (onLine ? (
          <Button variant="outlined" form="selection" type="submit">
            {registerButtonText}
          </Button>
        ) : (
          <div>네트워크 연결이 필요합니다</div>
        ))}
      {/* {enableRegister ?
        <Button variant='outlined' form='selection' type='submit'>{registerButtonText}</Button>
        :
        <Button variant='outlined' form='selection' type='submit' disabled>{registerButtonText}</Button>
      } */}
    </form>
  )
}

export default AddRegisterButton
