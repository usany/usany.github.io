import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';

const Cards = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
}:
{
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: {uid: string, displayName: string},
  num: number,
  points: number,
}) => {
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
  let shadowColor;
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];

  return (
    <div className='p-5 max-w-60 min-w-20'>
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
        }}
      >
        <CardActionArea>
          <Link 
            to='/specific'
            state = {{
              msgObj: msgObj,
              isOwner: isOwner,
              num: num,
              points: points
            }}
          >
          <CardMedia
            sx={{ height: 140 }}
            image={staticImg}
          />
          <CardContent>
            <div className='flex justify-center'>
              {msgObj.text.choose === 1 && <Chip label='우산 빌리기' />}
              {msgObj.text.choose === 2 && <Chip label='우산 빌려주기' />}
              {isOwner && 
                <Chip label='내 카드' />
              }
            </div>
            <div className='flex flex-col justify-center'>
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