import Popups from "../../core/Popups";
import { useSelectors, useTexts } from 'src/hooks';
import ContactDrawersContent from "./ContactDrawersContent";
import ContactDrawersTrigger from "./ContactDrawersTrigger";


function ContactFormDrawers() {
  const profile = useSelectors((state) => state.profile.value)
  const {reportList} = useTexts()

  if (!profile?.certificated) return null
  return (
    <Popups
      trigger={<ContactDrawersTrigger />}
      title={reportList}
      content={<ContactDrawersContent />}
    />
  )
}

export default ContactFormDrawers
