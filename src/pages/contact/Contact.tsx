import { Siren } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'
import ContactAddress from 'src/pages/contact/ContactAddress'
import ContactForm from 'src/pages/contact/ContactForm'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'

function Contact() {
  const profile = useSelectors((state) => state.profile.value)
  const {report, sending, receiving, supervisor} = useTexts()
  return (
    <>
      <PageTitle icon={<Siren />} title={report} />
      {profile && (
        <ContactAddress action={sending} label={profile?.displayName} />
      )}
      <ContactAddress action={receiving} label={supervisor} />
      <ContactForm />
    </>
  )
}

export default Contact
