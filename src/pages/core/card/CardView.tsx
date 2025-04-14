import West from '@mui/icons-material/West';
import { alpha, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { User } from 'firebase/auth';
import { Building, Watch } from 'lucide-react';
import { useSelector } from 'react-redux';
import staticImg from 'src/assets/pwa-512x512.png';
import useCardsBackground from 'src/hooks/useCardsBackground';
import { useSelectors } from 'src/hooks/useSelectors';
import locationsBuildings from 'src/pages/add/locationsBuildings';
import locationsCollection from 'src/pages/add/locationsCollection';
import locationsCollectionLetters from 'src/pages/add/locationsCollectionLetters';
import Avatars from '../Avatars';

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const CardView = ({ onTransfer, message, shadowColor }) => {
  const profileColor = useSelector((state) => state.profileColor.value)
  const profileUrl = message?.creatorUrl
  const { color } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)
  let item
  let action
  let locationOne
  let locationTwo
  let location
  if (languages === 'ko') {
    item = message.item
    if (message.text.choose === 1) {
      action = ' 빌리기'
    } else {
      action = ' 빌려주기'
    }
    location = message.text.count + ' ' + message.text.counter + ' ' + message.text.counting
  } else {
    if (message.item === '우산') {
      item = 'Usan'
    } else {
      item = 'Yangsan'
    }
    if (message.text.choose === 1) {
      action = ' borrowing'
    } else {
      action = ' lending'
    }
    locationOne = locationsBuildings['en'][locationsBuildings['ko'].indexOf(message.text.count)]
    locationTwo = locationsCollection['en'][Object.keys(locationsCollectionLetters).find((key) => locationsCollectionLetters[key] === message.text.count)][locationsCollection['ko'][Object.keys(locationsCollectionLetters).find((key) => locationsCollectionLetters[key] === message.text.count)].indexOf(message.text.counter)]
    location = locationOne + ' ' + locationTwo + ' ' + message.text.counting
  }
  locationsBuildings
  locationsCollection
  locationsCollectionLetters

  return (
    <div className='flex flex-col gap-5'>
      {onTransfer &&
        <div className='flex justify-center items-center z-30 rounded bg-black/50 text-white w-full h-full absolute'>
          <div className='flex justify-center items-center gap-1 h-full'>
            <West />
            <div>
              {languages === 'ko' ? '내 상태로 카드 전송됨' : 'Moved to board'}
            </div>
          </div>
        </div>
      }
      <Card
        sx={{
          width: 200,
          height: 280,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          bgcolor: color,
        }}
      >
        <CardContent sx={{ padding: '5px', bgcolor: onTransfer && alpha('#000000', 0.5), }}>
          {/* <div className='flex flex-col justify-center items-center absolute z-30 pt-20 text-profile-blue text-3xl w-full'>
            <div>
              {languages === 'ko' ? '게시판으로' : 'Move to board'}
            </div>
            <West style={{ fontSize: '100px' }} />
          </div> */}
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
                  label={`${item} ${action}`}
                />
                {/* <Chips
                  label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
                  className='bg-white'
                /> */}
              </div>
            </div>
            {/* <div className='flex justify-center items-center z-30 text-profile-blue w-full h-full absolute'>
              <div className='flex justify-center items-center gap-1 bg-light-1/50 dark:bg-dark-1 h-full rounded-md'>
                <West />
                <div>
                  {languages === 'ko' ? '내 상태로 카드 전송됨' : 'Moved to board'}
                </div>
              </div>
            </div> */}
            <div className="flex justify-center pt-1">
              <CardMedia
                sx={{
                  width: 159,
                  height: 141,
                }}
                image={staticImg}
              />
            </div>
            <div className="flex flex-col pt-1">
              <div className="flex gap-1">
                <div className='flex items-center'>
                  <Building />
                </div>
                <div>
                  {location}
                  {/* {message.text.count} {message.text.counter}{' '}
                  {message.text.counting !== '' && message.text.counting} */}
                </div>
              </div>
              <div className="flex gap-1">
                <div className='flex items-center'>
                  <Watch />
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    {languages === 'en' &&
                      <div className='w-[40px]'>From</div>
                    }
                    {message.text.clock?.year}.{message.text.clock?.month}.
                    {message.text.clock?.day} {message.text.clock?.hour}:
                    {message.text.clock?.minute} {languages === 'ko' && ' 부터'}
                  </div>
                  <div className="flex">
                    {languages === 'en' &&
                      <div className='w-[40px]'>To</div>
                    }
                    {message.text.clocker?.year}.{message.text.clocker?.month}.
                    {message.text.clock?.day} {message.text.clocker?.hour}:
                    {message.text.clocker?.minute} {languages === 'ko' && ' 까지'}
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
