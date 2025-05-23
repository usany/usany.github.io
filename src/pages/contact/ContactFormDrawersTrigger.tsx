import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useSelectors } from "src/hooks/useSelectors";
import useCardsBackground from '../../hooks/useCardsBackground';

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawersTrigger({ violationUser }: Props) {
  const languages = useSelectors((state) => state.languages.value)

  const { color, colorTwo } = useCardsBackground()

  return (
    <div>
      {violationUser ?
        <Card sx={{
          width: '100%',
          bgcolor: color
        }}>
          <div className='flex'>
            <div className='flex flex-col justify-center'>{languages === 'ko' ? '신고 유저:' : 'Reporting User'}</div>
            <div className='px-5'>
              <Avatar className={`bg-${(violationUser?.profileColor || []).indexOf('#') === -1 ? violationUser?.profileColor : 'profile-blue'}`}>
                <AvatarImage src={violationUser?.profileImageUrl} />
              </Avatar>
            </div>
            <div className='flex flex-col justify-center'>{violationUser.displayName}</div>
          </div>
        </Card>
        :
        <div className='flex justify-center'>
          <Button sx={{
            bgcolor: colorTwo, ":hover": {
              bgcolor: colorTwo
            }
          }} variant='outlined' form='auth'>{languages === 'ko' ? '신고 등록 유저' : 'Register reporting user'}</Button>
        </div>
      }
    </div>
  )
}

export default ContactFormDrawersTrigger
