import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useSelectors } from "src/hooks/useSelectors";
import useCardsBackground from '../../hooks/useCardsBackground';

const ContactUserSelected = ({ violationUser, color }) => {
  const profile = violationUser.profileImage ? violationUser.profileImageUrl : violationUser.defaultProfile
  const languages = useSelectors((state) => state.languages.value)

  return (
    <Card sx={{
      width: '100%',
      bgcolor: color
    }}>
      <div className='flex p-3 gap-3'>
        <div className='flex items-center'>{languages === 'ko' ? '신고 유저:' : 'Reporting User'}</div>
        <Avatar className={`bg-${(violationUser?.profileColor || []).indexOf('#') === -1 ? violationUser?.profileColor : 'profile-blue'}`}>
          <AvatarImage src={profile} />
        </Avatar>
        <div className='flex flex-col justify-center'>{violationUser.displayName}</div>
      </div>
    </Card>
  )
}
interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawersTrigger({ violationUser }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const { colorTwo } = useCardsBackground()
  return (
    <div>
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
    </div>
  )
}

export default ContactFormDrawersTrigger
