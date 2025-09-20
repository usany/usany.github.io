import Button from '@mui/material/Button'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'

interface Props {
  submit: (event: {}) => void
  enableRegister: boolean
}

const AddRegisterButton = ({ submit, enableRegister }: Props) => {
  const { registerButton } = useTexts()
  const onLine = useSelectors((state) => state.onLine.value)
  const {pleaseSignIn} = useTexts()
  return (
    <form className="flex justify-center pt-5" id="selection" onSubmit={submit}>
      {/* {enableRegister && */}
      {
        (onLine ? (
          <Button variant="outlined" form="selection" type="submit">
            {registerButton}
          </Button>
        ) : (
          <>{pleaseSignIn}</>
        ))}
    </form>
  )
}

export default AddRegisterButton
