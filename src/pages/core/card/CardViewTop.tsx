import East from '@mui/icons-material/East'
import West from '@mui/icons-material/West'
import { alpha, Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { User } from 'firebase/auth'
import { Building, Watch } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import staticImg from 'src/assets/pwa-512x512.png'
import useCardsBackground from 'src/hooks/useCardsBackground'
import { useSelectors } from 'src/hooks/useSelectors'
import locationsBuildings from 'src/pages/add/locationsBuildings'
import locationsCollection from 'src/pages/add/locationsCollection'
import locationsCollectionLetters from 'src/pages/add/locationsCollectionLetters'
import Avatars from '../Avatars'
import CardViewTop from './CardView'

const CardViewLocation = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  let location
  if (languages === 'ko') {
    location =
      message.text.count +
      ' ' +
      message.text.counter +
      ' ' +
      message.text.counting
  } else {
    const locationOne =
      locationsBuildings['en'][
        locationsBuildings['ko'].indexOf(message.text.count)
      ]
    const locationTwo =
      locationsCollection['en'][
        Object.keys(locationsCollectionLetters).find(
          (key) => locationsCollectionLetters[key] === message.text.count,
        )
      ][
        locationsCollection['ko'][
          Object.keys(locationsCollectionLetters).find(
            (key) => locationsCollectionLetters[key] === message.text.count,
          )
        ].indexOf(message.text.counter)
      ]
    location = locationOne + ' ' + locationTwo + ' ' + message.text.counting
  }
  return (
    <div className="flex gap-1">
      <div className="flex items-center">
        <Building />
      </div>
      <div className="flex items-center">{location}</div>
    </div>
  )
}
const CardViewTime = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex gap-1">
      <div className="flex items-center">
        <Watch />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex">
          {languages === 'en' && <div className="w-[40px]">From</div>}
          {message.text.clock?.year}.{message.text.clock?.month}.
          {message.text.clock?.day} {message.text.clock?.hour}:
          {message.text.clock?.minute} {languages === 'ko' && ' 부터'}
        </div>
        <div className="flex">
          {languages === 'en' && <div className="w-[40px]">To</div>}
          {message.text.clocker?.year}.{message.text.clocker?.month}.
          {message.text.clock?.day} {message.text.clocker?.hour}:
          {message.text.clocker?.minute} {languages === 'ko' && ' 까지'}
        </div>
      </div>
    </div>
  )
}
const CardViewTransfer = () => {
const CardViewTransfer = () => {
  const languages = useSelectors((state) => state.languages.value)
  const locations = useLocation()
  return (
    <div className="flex justify-center items-center z-30 rounded bg-black/50 text-white w-full h-full absolute">
      {locations.pathname === '/' ? (
        <div className="flex justify-center items-center gap-1 h-full">
          <East />
          <div>
            {languages === 'ko' ? '게시판으로 카드 전송됨' : 'Moved to board'}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-1 h-full">
          <West />
          <div>
            {languages === 'ko'
              ? '내 상태로 카드 전송됨'
              : 'Moved to my status'}
          </div>
        </div>
      )}
    </div>
  )
}
interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const CardView = ({ onTransfer, message, shadowColor }) => {
  const { color } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)
  const locations = useLocation()

  return (
    <div className="flex flex-col gap-5">
      {onTransfer && <CardViewTransfer />}
      <Card
        sx={{
          width: 200 * 0.9,
          height: 280 * 0.9,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          bgcolor: color,
        }}
      >
        <CardContent
          sx={{ padding: '5px', bgcolor: onTransfer && alpha('#000000', 0.5) }}
        >
          <div>
            <CardViewTop message={message} />
            <div className="flex justify-center pt-1">
              <CardMedia
                sx={{
                  width: 159 * 0.9,
                  height: 141 * 0.9,
                }}
                image={staticImg}
              />
            </div>
            <div className="flex flex-col pt-1 gap-1 text-xs">
              <CardViewLocation message={message} />
              <CardViewTime message={message} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardView
