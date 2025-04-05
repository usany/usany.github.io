import { Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { User } from 'firebase/auth'
import { Building, Watch } from 'lucide-react'
import { useSelector } from 'react-redux'
import staticImg from 'src/assets/pwa-512x512.png'
import useCardsBackground from 'src/hooks/useCardsBackground'
import Avatars from '../Avatars'

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const CardView = ({ message, shadowColor }) => {
  const profileColor = useSelector((state) => state.profileColor.value)
  const profileUrl = message?.creatorUrl
  const { color } = useCardsBackground()
  return (
    <div className='flex flex-col gap-5'>
      <Card
        sx={{
          width: 200,
          height: 280,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          bgcolor: color,
        }}
      >
        <CardContent sx={{ padding: '5px' }}>
          <div>
            <div className="flex justify-between gap-1">
              <Avatars
                uid={message.creatorId}
                profile={false}
                profileColor={profileColor}
                profileUrl={profileUrl}
                piazza={null}
              />
              <div className="flex items-center">
                <Chip
                  label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
                />
                {/* <Chips
                  label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
                  className='bg-white'
                /> */}
              </div>
            </div>
            <div className="flex justify-center pt-1">
              <CardMedia
                sx={{
                  width: 159,
                  height: 141,
                }}
                image={staticImg}
              />
            </div>
            <div className="flex flex-col gap-3 p-1">
              <div className="flex gap-3">
                <Building />
                <div>
                  {message.text.count} {message.text.counter}{' '}
                  {message.text.counting !== '' && message.text.counting}
                </div>
              </div>
              <div className="flex gap-3">
                <Watch />
                <div className="flex flex-col">
                  <div className="flex">
                    {message.text.clock?.year}.{message.text.clock?.month}.
                    {message.text.clock?.day} {message.text.clock?.hour}:
                    {message.text.clock?.minute} 부터
                  </div>
                  <div className="flex">
                    {message.text.clocker?.year}.{message.text.clocker?.month}.
                    {message.text.clock?.day} {message.text.clocker?.hour}:
                    {message.text.clocker?.minute} 까지
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <div className={`w-[200px] h-[280px] rounded-lg bg-light-2 dark:bg-dark-2 shadow-md shadow-profile-blue`}>
        <div className='p-1'>
          <div className="flex justify-between gap-1">
            <Avatars
              uid={message.creatorId}
              profile={false}
              profileColor={profileColor}
              profileUrl={profileUrl}
              piazza={null}
            />
            <div className="flex items-center">
              <Chip
                label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
              />
              <Chips
                label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
                className='bg-white dark:bg-dark-4'
              />
            </div>
          </div>
          <div className="flex justify-center pt-1">
            <CardMedia
              sx={{
                width: 159,
                height: 141,
              }}
              image={staticImg}
            />
          </div>
          <div className="flex flex-col gap-3 p-1">
            <div className="flex gap-3">
              <Building />
              <div>
                {message.text.count} {message.text.counter}{' '}
                {message.text.counting !== '' && message.text.counting}
              </div>
            </div>
            <div className="flex gap-3">
              <Watch />
              <div className="flex flex-col">
                <div className="flex">
                  {message.text.clock?.year}.{message.text.clock?.month}.
                  {message.text.clock?.day} {message.text.clock?.hour}:
                  {message.text.clock?.minute} 부터
                </div>
                <div className="flex">
                  {message.text.clocker?.year}.{message.text.clocker?.month}.
                  {message.text.clock?.day} {message.text.clocker?.hour}:
                  {message.text.clocker?.minute} 까지
                </div>
              </div>
            </div>
          </div>
        </div>
      </div > */}
    </div>
  )
}

export default CardView
