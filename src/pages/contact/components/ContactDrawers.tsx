import Popups from "../../core/Popups";
import { useSelectors } from 'src/hooks';
import ContactDrawersContent from "./ContactDrawersContent";
import ContactDrawersTitle from "./ContactDrawersTitle";
import ContactDrawersTrigger from "./ContactDrawersTrigger";


function ContactFormDrawers() {
  const profile = useSelectors((state) => state.profile.value)

  if (!profile?.certificated) return null
  return (
    <Popups
      trigger={<ContactDrawersTrigger />}
      title={<ContactDrawersTitle />}
      content={<ContactDrawersContent />}
    />
  )
}

export default ContactFormDrawers
