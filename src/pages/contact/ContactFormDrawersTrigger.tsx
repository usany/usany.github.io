import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useSelectors } from "src/hooks";
import useCardsBackground from '../../hooks/useCardsBackground';
import { DocumentData } from "firebase/firestore";
import ContactUserSelected from "./ContactUserSelected";

interface Props {
  violationUser: DocumentData | null
}

function ContactFormDrawersTrigger({ violationUser }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const { colorTwo } = useCardsBackground()
  return (
    <>
      {violationUser ?
        <ContactUserSelected violationUser={violationUser} color={colorTwo} />
        :
        <div className='flex justify-center'>
          <Button sx={{
            bgcolor: colorTwo, ":hover": {
              bgcolor: colorTwo
            }
          }} variant='outlined' form='auth'>{languages === 'ko' ? '신고 등록 유저' : 'Register reporting user'}</Button>
        </div>
      }
    </>
  )
}

export default ContactFormDrawersTrigger
