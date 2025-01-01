import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer, Suspense, lazy } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
import staticImageJ from 'src/assets/blue-01.png';
import staticImageC from 'src/assets/screen-01.png';

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
// const shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];

const Cards = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
}: Props) => {
  const [staticImage, setStaticImage] = useState('')
  const shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];
  // const shadowColorArray = [
  //   'lightblue', 
  //   'lightcoral',
  //   'lightcyan',
  //   'lightgoldenrodyellow',
  //   'lightgray',
  //   'lightgreen', 
  //   'lightpink',
  //   'lightsalmon',
  //   'lightseagreen',
  //   'lightskyblue',
  //   'lightsteelblue', 
  //   'lightyellow'
  // ]
  // const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  // const letters = alpha.map((x) => String.fromCharCode(x));
  // const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  // const mergedArray = letters.concat(numbers)
  
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
    <div className='max-w-60 min-w-20 p-1'>
      <Card
        sx={{
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`
        }}
      >
        <CardActionArea>
          <Link 
            to='/specific'
            state = {{
              msgObj: msgObj,
              isOwner: isOwner,
              num: num,
              points: points,
              staticImage: staticImage
            }}
          >
          <CardMedia
            sx={{ height: 140 }}
            image={staticImage}
          />
          <CardContent>
            <div className='flex justify-center'>
              {msgObj.text.choose === 1 && <Chip label={`${msgObj.item} 빌리기`} />}
              {msgObj.text.choose === 2 && <Chip label={`${msgObj.item} 빌려주기`} />}
              {isOwner && <Chip label='내 카드' />}
            </div>
            <div className='flex flex-col'>
              <div className='flex justify-center'>{msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting !== '' && msgObj.text.counting}</div>
              <div className='flex justify-center'>{msgObj.text.clock?.year}.{msgObj.text.clock?.month}.{msgObj.text.clock?.day} {msgObj.text.clock?.hour}:{msgObj.text.clock?.minute} 부터</div>
              <div className='flex justify-center'>{msgObj.text.clocker?.year}.{msgObj.text.clocker?.month}.{msgObj.text.clock?.day} {msgObj.text.clocker?.hour}:{msgObj.text.clocker?.minute} 까지</div>
            </div>
          </CardContent>
          </Link>
        </CardActionArea>
        <CardActions className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={isOwner} uid={userObj?.uid} displayName={userObj?.displayName} userObj={userObj} num={num} points={points} />
        </CardActions>
      </Card>
    </div>
  );
}

export default Cards