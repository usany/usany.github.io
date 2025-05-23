import Button from '@mui/material/Button';
import { Ban } from 'lucide-react';
import Popups from "../core/Popups";
import ContactFormDrawersContent from "./ContactFormDrawersContent";
import ContactFormDrawersTitle from "./ContactFormDrawersTitle";
import ContactFormDrawersTrigger from "./ContactFormDrawersTrigger";

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawers({ violationUser, changeViolationUser }: Props) {
  return (
    <div className='flex justify-center w-full'>
      <Popups trigger={<ContactFormDrawersTrigger violationUser={violationUser} />} title={<ContactFormDrawersTitle />} content={<ContactFormDrawersContent changeViolationUser={changeViolationUser} />} />
      {violationUser &&
        <Button variant='outlined' onClick={() => changeViolationUser(null)}><Ban /></Button>
      }
    </div>
  )
}

export default ContactFormDrawers
