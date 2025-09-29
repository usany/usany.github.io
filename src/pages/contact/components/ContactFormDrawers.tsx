import Button from '@mui/material/Button';
import { Ban } from 'lucide-react';
import Popups from "../../core/Popups";
import { ContactFormDrawersContent, ContactFormDrawersTitle, ContactFormDrawersTrigger } from "./";
import { useSelectors } from 'src/hooks';
import { DocumentData } from 'firebase/firestore';

interface Props {
  violationUser: DocumentData | null
  changeViolationUser: (newValue: DocumentData | null) => void
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
