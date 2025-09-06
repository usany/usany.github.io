import { useTexts } from 'src/hooks'

function ContactFormDrawersTitle() {
  const { searchUser } = useTexts()
  return <div>{searchUser}</div>
}

export default ContactFormDrawersTitle
