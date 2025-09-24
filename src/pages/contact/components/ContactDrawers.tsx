import Popups from "../../core/Popups";
import { useSelectors } from 'src/hooks';
import {ContactDrawersContent, ContactDrawersTitle, ContactDrawersTrigger} from "./";


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
