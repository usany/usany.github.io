import { useTexts } from 'src/hooks'

const ContactDrawersTitle = () => {
  const {reportList} = useTexts()
  return <>{reportList}</>
}

export default ContactDrawersTitle
