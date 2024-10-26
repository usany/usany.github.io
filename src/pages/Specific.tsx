import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Steppers from 'src/muiComponents/Steppers';
import Button from '@mui/material/Button';
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';

function Specific({ 
    userObj,
    value, 
    setValue,
    counter,
    setCounter, 
    }) {

      const {state} = useLocation()
      const navigate = useNavigate()
      // const [stepper, setStepper] = useState(state.msgObj.round-1)
      const [msgObj, setMsgObj] = useState(state.msgObj)
      const [num, setNum] = useState(null)
      const [points, setPoints] = useState(null)
      const [deleted, setDeleted] = useState(false)

      useEffect(() => {
        onSnapshot(query(collection(dbservice, 'num')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
              if (document.id === state.msgObj.id) {
                setMsgObj({id: document.id, ...document.data()})
              }
            })
            const newArrayId = snapshot.docs.map((document) => document.id)
            if (newArrayId.indexOf(state.msgObj.id) === -1) {
              setDeleted(true)
            }
        })
      }, [])
      useEffect(() => {
        onSnapshot(query(doc(dbservice, `members/${msgObj.creatorId}`)), (snapshot) => {
            const number = snapshot.data().points
            setNum(number)
          }
        )
      }, [])
      useEffect(() => {
        if (msgObj.connectedId !== null) {
          onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
            const element = snapshot.data().points
            setPoints(element)
          })
        }
      })
  
  const onClick = () => {
    navigate(-1)
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
  let shadowColor;
  // console.log(/[a-z]/.exec(/[a-z]/))
  // if (/[a-z]/.exec(String(msgObj.id[0]).toLowerCase()) === String(msgObj.id[0]).toLowerCase()) {
  //   shadowColor = 'green';
  // }  
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  // const nums = Array.from(Array(10), (e, i) => i);
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];

  return (
    <div className='p-5'>
    <Card
      sx={{
        boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
      }}
    >
      {/* <CardActionArea> */}
      {/* {msgObj.text.choose === 1 && 
        <div className='flex justify-center'>빌리기 카드</div>
      }
      {msgObj.text.choose === 2 && 
        <div className='flex justify-center'>빌려주기 카드</div>
      } */}
        <CardMedia
          sx={{ height: 140 }}
          image={'src/assets/pwa-512x512.png'}
        />
        <CardContent>
        <div className='flex justify-center'>
          {msgObj.text.choose === 1 && <Chip label='빌리기' />}
          {msgObj.text.choose === 2 && <Chip label='빌려주기' />}
          {msgObj.creatorId === (userObj?.uid || null) && 
            <Chip label='내가 작성함' />
          }
        </div>
        <Steppers msgObj={msgObj} />
        <div className='flex pt-5'>진행 단계: {msgObj.round}</div>
      {/* {msgObj.text.choose === 1 && 
        <div className='flex justify-center'>빌리기</div>
      }
      {msgObj.text.choose === 2 && 
        <div className='flex justify-center'>빌려주기</div>
      } */}
      <div className='flex justify-between'>
      {msgObj.text.choose === 1 && 
        <div>
          <div>빌리는 유저: {msgObj.displayName}</div>
          <div>빌려주는 유저: {msgObj.connectedName}</div>
        </div>
      }
      {msgObj.text.choose === 2 && 
        <div>
          <div>빌려주는 유저: {msgObj.displayName}</div>
          <div>빌리는 유저: {msgObj.connectedName}</div>
        </div>
      }
{/* 
      <div className='flex justify-center'>요청 유저: {msgObj.displayName}</div>
      <div className='flex content-end'>승낙 유저: {msgObj.connectedName || '승낙 대기'}</div> */}
      </div>
      <div className='flex'>위치: {msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting}</div>
      {/* <div className='flex justify-center'>열람실의 위치: {state.msgObj.text.counting}</div>
      <div className='flex justify-center'>좌석의 위치: {state.msgObj.text.counter}</div> */}
      <div className='flex'>이 때부터: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute}</div>
      <div className='flex'>이 때까지: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute}</div>
      <div className='flex'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute} 부터</div>
      <div className='flex'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute} 까지</div>
      {/* <div className='flex justify-center'>진행 단계: {msgObj.round}</div> */}
      <div className='flex'>적립 포인트: {msgObj.point}</div>
      {/* <Btn msgObj={state.msgObj} isOwner={state.isOwner} uid={state.uid} displayName={state.displayName} num={state.num} value={state.value} /> */}
      <div className='flex justify-center'>
      {deleted === false && userObj !== null &&
        <div className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={msgObj.creatorId === userObj.uid} uid={userObj.uid} displayName={userObj.displayName} userObj={userObj} num={num} value={value} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
        </div>
      }
      {deleted === false && userObj === null &&
        <div className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={false} uid={null} displayName={null} userObj={userObj} num={num} value={value} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
        </div>
      }
      {deleted === true && 
        <div className='flex justify-center'>
          <Button variant='outlined' disabled>지워졌습니다</Button>
        </div>
      }
      <div className='flex justify-center'>
        <Button variant='outlined' onClick={onClick}>뒤로 가기</Button>
      </div>
      </div>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
    </div>
  )
}

export default Specific
