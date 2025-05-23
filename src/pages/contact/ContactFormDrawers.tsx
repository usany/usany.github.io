import Button from '@mui/material/Button';
import { useSelectors } from "src/hooks/useSelectors";
import Popups from "../core/Popups";
import ContactFormDrawersContent from "./ContactFormDrawersContent";
import ContactFormDrawersTitle from "./ContactFormDrawersTitle";
import ContactFormDrawersTrigger from "./ContactFormDrawersTrigger";

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawers({ violationUser, changeViolationUser }: Props) {
  const languages = useSelectors((state) => state.languages.value)

  return (
    <div className='flex justify-center w-full'>
      <Popups trigger={<ContactFormDrawersTrigger violationUser={violationUser} />} title={<ContactFormDrawersTitle />} content={<ContactFormDrawersContent changeViolationUser={changeViolationUser} />} />
      {violationUser && <Button variant='outlined' onClick={() => changeViolationUser(null)}>{languages === 'ko' ? '신고 등록 취소' : 'Cancel reporting'}</Button>
      }
    </div>
  )
}

export default ContactFormDrawers
