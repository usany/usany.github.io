import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useSelectors } from "src/hooks";
import useCardsBackground from '../../hooks/useCardsBackground';
import { DocumentData } from "firebase/firestore";
interface Props {
  violationUser: DocumentData | null
  color: string
}

const ContactUserSelected = ({ violationUser, color }: {
  violationUser: DocumentData | null
  color: string
}) => {
  const profile = violationUser?.profileImage ? violationUser.profileImageUrl : violationUser?.defaultProfile
  const languages = useSelectors((state) => state.languages.value)
  const displayName = violationUser?.displayName.slice(0, 10)+'......'
  return (
    <Card sx={{
      width: '100%',
      bgcolor: color
    }}>
      <div className='flex justify-between p-3 gap-3'>
        <div className='flex items-center'>{languages === 'ko' ? '신고 유저:' : 'Reporting User'}</div>
        <Avatar>
          <AvatarImage src={profile} />
        </Avatar>
        <div className='flex items-center'>{displayName}</div>
      </div>
    </Card>
  )
}

export default ContactUserSelected
