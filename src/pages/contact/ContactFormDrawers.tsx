import Button from '@mui/material/Button';
import { Ban } from 'lucide-react';
import Popups from "../core/Popups";
import ContactFormDrawersContent from "./ContactFormDrawersContent";
import ContactFormDrawersTitle from "./ContactFormDrawersTitle";
import ContactFormDrawersTrigger from "./ContactFormDrawersTrigger";
import { useSelectors } from 'src/hooks';

interface Props {
  violationUser: {
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null
  changeViolationUser: (newValue: {
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null) => void
}

function ContactFormDrawers({ violationUser, changeViolationUser }: Props) {
  const profile = useSelectors((state) => state.profile.value)

  if (!profile?.certificated) return null
  return (
    <div className='flex gap-5 pt-3 px-5'>
      <Popups trigger={<ContactFormDrawersTrigger violationUser={violationUser} />} title={<ContactFormDrawersTitle />} content={<ContactFormDrawersContent changeViolationUser={changeViolationUser} />} />
      {violationUser &&
        <Button variant='outlined' onClick={() => changeViolationUser(null)}><Ban /></Button>
      }
    </div>
  )
}

export default ContactFormDrawers
