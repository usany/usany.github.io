import Button from '@mui/material/Button';
import { Ban } from 'lucide-react';
import Popups from "../core/Popups";
import ContactFormDrawersContent from "./ContactFormDrawersContent";
import ContactFormDrawersTitle from "./ContactFormDrawersTitle";
import ContactFormDrawersTrigger from "./ContactFormDrawersTrigger";

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
  return (
    <div className='flex justify-center w-full gap-5'>
      <Popups trigger={<ContactFormDrawersTrigger violationUser={violationUser} />} title={<ContactFormDrawersTitle />} content={<ContactFormDrawersContent changeViolationUser={changeViolationUser} />} />
      {violationUser &&
        <Button variant='outlined' onClick={() => changeViolationUser(null)}><Ban /></Button>
      }
    </div>
  )
}

export default ContactFormDrawers
