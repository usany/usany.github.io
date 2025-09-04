import Button from '@mui/material/Button'
import { useSelectors } from 'src/hooks'
import useTexts from 'src/hooks'

interface Props {
  submit: (event: {}) => void
}

const AddRegisterButton = ({ submit, fromTo, enableRegister }: Props) => {
  const { registerButton } = useTexts()
  const onLine = useSelectors((state) => state.onLine.value)
  return (
    <form className="flex justify-center pt-5" id="selection" onSubmit={submit}>
      {enableRegister &&
        (onLine ? (
          <Button variant="outlined" form="selection" type="submit">
            {registerButton}
          </Button>
        ) : (
          <div>네트워크 연결이 필요합니다</div>
        ))}
    </form>
  )
}

export default AddRegisterButton
