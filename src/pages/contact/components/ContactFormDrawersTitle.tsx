import { useTexts } from 'src/hooks'

function ContactFormDrawersTitle() {
  const { searchUser } = useTexts()
  return <>{searchUser}</>
}

export default ContactFormDrawersTitle
