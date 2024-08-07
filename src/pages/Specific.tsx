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

function Specific({ 
    isLoggedIn,
    userObj,
    setUserObj, 
    value, 
    newAccount,
    setNewAccount,
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

  useEffect(() => {
    if (!isLoggedIn && userObj !== null) {
      navigate('/postings/')
    }
  })
  // useEffect(() => {
  //   setStepper(state.msgObj.round-1)
  // })
  
  const onClick = () => {
    navigate(-1)
  }
  console.log(deleted)

  return (
    <div>
    <Card
      sx={{
        // width: '100%',
      }}
    >
      <CardActionArea>
      {msgObj.text.choose === 1 && 
        <div className='flex justify-center'>빌리기 카드</div>
      }
      {msgObj.text.choose === 2 && 
        <div className='flex justify-center'>빌려주기 카드</div>
      }
        <CardMedia
          sx={{ height: 140 }}
          image={'src/assets/pwa-512x512.png'}
        />
        <CardContent>
        <div className='flex justify-center'>진행 단계: {msgObj.round}</div>
        <Steppers msgObj={msgObj} />
      {/* {msgObj.text.choose === 1 && 
        <div className='flex justify-center'>빌리기</div>
      }
      {msgObj.text.choose === 2 && 
        <div className='flex justify-center'>빌려주기</div>
      } */}
      <div className='flex justify-center'>요청 유저: {msgObj.displayName}</div>
      <div className='flex justify-center'>위치: {msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting}</div>
      {/* <div className='flex justify-center'>열람실의 위치: {state.msgObj.text.counting}</div>
      <div className='flex justify-center'>좌석의 위치: {state.msgObj.text.counter}</div> */}
      <div className='flex justify-center'>이 때부터: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute}</div>
      <div className='flex justify-center'>이 때까지: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute}</div>
      <div className='flex justify-center'>승낙 유저: {msgObj.connectedName}</div>
      {/* <div className='flex justify-center'>진행 단계: {msgObj.round}</div> */}
      <div className='flex justify-center'>적립 포인트: {msgObj.point}</div>
      {/* <Btn msgObj={state.msgObj} isOwner={state.isOwner} uid={state.uid} displayName={state.displayName} num={state.num} value={state.value} /> */}
      {deleted === false && userObj !== null &&
        <div className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={msgObj.creatorId === userObj.uid} uid={userObj.uid} displayName={userObj.displayName} isLoggedIn={isLoggedIn} num={num} value={value} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
        </div>
      }
      {deleted === false && userObj === null &&
        <div className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={false} uid={null} displayName={null} isLoggedIn={isLoggedIn} num={num} value={value} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
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
        </CardContent>
      </CardActionArea>
    </Card>
      
    </div>
  )
}

export default Specific
