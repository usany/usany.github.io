import Button from '@mui/material/Button';
import { useTexts } from "src/hooks";
import useCardsBackground from '../../hooks/useCardsBackground';
import { DocumentData } from "firebase/firestore";
import ContactUserSelected from "./ContactUserSelected";

interface Props {
  violationUser: DocumentData | null
}

function ContactFormDrawersTrigger({ violationUser }: Props) {
  const { colorTwo } = useCardsBackground()
  const {registerReportingUser} = useTexts()
  
  if (violationUser) return <ContactUserSelected violationUser={violationUser} color={colorTwo} />
  return (
    <div className='flex justify-center'>
      <Button sx={{
        bgcolor: colorTwo, ":hover": {
          bgcolor: colorTwo
        }
      }} variant='outlined' form='auth'>{registerReportingUser}</Button>
    </div>
  )
}

export default ContactFormDrawersTrigger
