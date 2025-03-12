import { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';

function RegisteredCards({
  msgObj,
  isOwner,
}) {
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
  shadowColor = shadowColorArray[letters.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];

  return (
    <div className='flex px-5 pt-5 pb-52 max-w-60 min-w-20'>
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
        }}
      >
          <CardMedia
            sx={{ height: 140 }}
            image={staticImg}
          />
          <CardContent>
            <div className='flex justify-center'>
              {msgObj.text.choose === 1 && <Chip label='빌리기' />}
              {msgObj.text.choose === 2 && <Chip label='빌려주기' />}
              {isOwner &&
                <Chip label='내가 작성함' />
              }
            </div>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center'>{msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting !== '' && msgObj.text.counting}</div>
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute} 부터</div>
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute} 까지</div>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}

export default RegisteredCards
