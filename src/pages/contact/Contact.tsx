import { Siren } from 'lucide-react'
import { useTexts } from 'src/hooks'
import ContactForm from 'src/pages/contact/ContactForm'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'

function Contact() {
  const {report} = useTexts()
  return (
    <>
      <PageTitle icon={<Siren />} title={report} />
<<<<<<< HEAD
      {/* {profile && (
        <ContactAddress action={sending} label={profile?.displayName} />
      )}
      <ContactAddress action={receiving} label={supervisor} /> */}
=======
>>>>>>> branch
      <ContactForm />
    </>
  )
}

export default Contact
