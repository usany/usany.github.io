import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer, Suspense, lazy } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Specifics from 'src/pages/core/specifics/Specifics';
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
import Avatars from '../../pages/core/Avatars';
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';

interface Props {
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: User | null,
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

const CardsViews = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
}: Props) => {
  const [staticImage, setStaticImage] = useState('')
  const shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];
  const profileColor = useSelector(state => state.profileColor.value)
  const profileImage = useSelector(state => state.profileImage.value)
  useEffect(() => {
    if (msgObj.text.count === '중도') {
      setStaticImage(staticImageJ)
    } else if (msgObj.text.count === '청운') {
      setStaticImage(staticImageC)
    } else {
      setStaticImage(staticImg)
    }
  }, [msgObj])

  return (
    <div>
    <Card
                sx={{
                    width: 200,
                    height: 280,
                    boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`
                }}
            >
                <CardContent sx={{padding: '5px'}}>
                    <div>
                        <div className='flex justify-between gap-1'>
                            <Avatars profile={false} profileColor={profileColor} profileImage={profileImage} fallback={userObj?.displayName ? userObj.displayName[0] : ''}/>
                            {<Chip label={`${msgObj.item} ${msgObj.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`} />}
                            {/* {item && <Chip label='내가 작성함' />} */}
                        </div>
                        {/* {!item &&
                            <div className='flex justify-center pt-5'>
                                빈 카드입니다
                            </div>
                        } */}
                        <div className='pt-1'>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={staticImg}
                            />
                        </div>
                        {/* {locationState.locationOne && 
                        } */}
                        <div className='flex flex-col'>
                          <div className='flex justify-center'>{msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting !== '' && msgObj.text.counting}</div>
                          <div className='flex justify-center'>{msgObj.text.clock?.year}.{msgObj.text.clock?.month}.{msgObj.text.clock?.day} {msgObj.text.clock?.hour}:{msgObj.text.clock?.minute} 부터</div>
                          <div className='flex justify-center'>{msgObj.text.clocker?.year}.{msgObj.text.clocker?.month}.{msgObj.text.clock?.day} {msgObj.text.clocker?.hour}:{msgObj.text.clocker?.minute} 까지</div>
                        </div>
                        {/* <div className='flex flex-col justify-center pt-1'>
                            {locationState && <div className='flex justify-center'>{locationState?.locationOne} {locationState?.locationTwo} {locationState?.locationThree}</div>}
                            {fromTo.from && <div className='flex justify-center'>{fromTo.from.year}.{fromTo.from.month < 10 && '0'}{fromTo.from.month}.{fromTo.from.day < 10 && '0'}{fromTo.from.day} {fromTo.from.hour < 10 && '0'}{fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}{fromTo.from.minute} 부터</div>}
                            {fromTo.to && <div className='flex justify-center'>{fromTo.to.year}.{fromTo.to.month < 10 && '0'}{fromTo.to.month}.{fromTo.from.day < 10 && '0'}{fromTo.to.day} {fromTo.to.hour < 10 && '0'}{fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}{fromTo.to.minute} 까지</div>}
                        </div> */}
                    </div>
                </CardContent>
            </Card>
    </div>
  );
}

export default CardsViews