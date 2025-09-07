import { useTexts } from 'src/hooks'

const ContactDrawersTitle = () => {
  const {reportList} = useTexts()
  return <div className="flex justify-center pt-5">{reportList}</div>
}

export default ContactDrawersTitle
