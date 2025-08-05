import { useSelectors } from 'src/hooks/useSelectors'
import useTexts from 'src/useTexts'

function ContactFormDrawersTitle() {
  const languages = useSelectors((state) => state.languages.value)
  const { searchUser } = useTexts()
  return <div>{searchUser}</div>
}

export default ContactFormDrawersTitle
