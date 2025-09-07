import { Siren } from 'lucide-react'
import { useTexts } from 'src/hooks'
import ContactForm from 'src/pages/contact/components/ContactForm'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'

function Contact() {
  const {report} = useTexts()
  return (
    <>
      <PageTitle icon={<Siren />} title={report} />
      <ContactForm />
    </>
  )
}

export default Contact
