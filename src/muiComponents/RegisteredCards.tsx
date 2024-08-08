import { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
// import { Fragment } from 'react/jsx-runtime';

function RegisteredCards({ 
  msgObj,
  isOwner,
  // userObj,
  // isLoggedIn,
  // num,
  // points,
  // setValue,
  // counter,
  // setCounter
}) {
  // const [specific, setSpecific] = useState(false)
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
  // console.log(/[a-z]/.exec(/[a-z]/))
  // if (/[a-z]/.exec(String(msgObj.id[0]).toLowerCase()) === String(msgObj.id[0]).toLowerCase()) {
  //   shadowColor = 'green';
  // }  
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  // if (letters.indexOf(String(msgObj.id[0]).toUpperCase())%2 === 0) {
  // }
  shadowColor = shadowColorArray[letters.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];
  // console.log(letters);

  return (
    <div className='max-w-60 min-w-20'>
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
        }}
      >
        {/* <CardActionArea 
        > */}
          {/* <Link 
            to='/postings/specific'
            state = {{
              msgObj: msgObj,
              isOwner: isOwner,
              num: num,
              points: points
            }}
          > */}
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
          {/* </Link> */}
          {/* <CardActions className='flex justify-center'>
            <Btn msgObj={msgObj} isOwner={isOwner} uid={userObj.uid} displayName={userObj.displayName} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
          </CardActions> */}
        {/* </CardActionArea> */}
      </Card>
    </div>
  );
}

export default RegisteredCards