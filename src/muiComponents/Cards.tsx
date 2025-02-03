import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer, Suspense, lazy } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Specifics from 'src/muiComponents/Specifics';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
import staticImageJ from 'src/assets/blue-01.png';
import staticImageC from 'src/assets/screen-01.png';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import useLongPress from 'src/hooks/useLongPress';
import CardsViews from './CardsViews';
import MorphingDialogs from './MorphingDialogs';

interface Props {
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: {uid: string, displayName: string},
  num: number | null,
  points: number | null,
}
const shadowColorArray = [
  'lightblue', 
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen', 
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightsteelblue', 
  'lightyellow'
]
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const letters = alpha.map((x) => String.fromCharCode(x));
const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
const mergedArray = letters.concat(numbers)

const Cards = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
  onLongPress,
  changeOnLongPress,
  longPressCard,
  changeLongPressCard,
}: Props) => {
  const [longPressed, setLongPressed] = useState(false)
  
  const cardsRef = useRef()
  useLongPress(cardsRef, () => {
    if (longPressCard && !onLongPress) {
      setLongPressed(true)
      changeOnLongPress(onLongPress+1)
    }
  })
  useEffect(() => {
    if (!onLongPress) {
      setLongPressed(false)
    }
  }, [onLongPress])

  return (
    <div className='max-w-60 min-w-20 p-1'
      ref={cardsRef}
    >
      {longPressed ?
        <div className='flex'>
          <div className='longPress pt-5'
            onClick={() => {
              setLongPressed(false)
              changeOnLongPress(onLongPress-1)
            }}
          >
            <CardsViews msgObj={msgObj} isOwner={isOwner} userObj={userObj} num={num} points={points} />
          </div>
          {longPressed && 
            <div className='z-10' onClick={() => console.log('sample')}>
              <Chip label={<DeleteIcon />} color='error'/>
            </div>
          }
        </div>
        :
        <div>
          {onLongPress ?
            <div onClick={() => {
              setLongPressed(true)
              changeOnLongPress(onLongPress+1)
            }}>
              <CardsViews msgObj={msgObj} isOwner={isOwner} userObj={userObj} num={num} points={points} />
            </div>
            :
            <MorphingDialogs msgObj={msgObj} isOwner={isOwner} userObj={userObj} num={num} points={points} />
          }
        </div>
      }
    </div>
  );
}

export default Cards