import useTexts from 'src/useTexts'

function ContactFormDrawersTitle() {
  const { searchUser } = useTexts()
  return <div>{searchUser}</div>
}

export default ContactFormDrawersTitle
