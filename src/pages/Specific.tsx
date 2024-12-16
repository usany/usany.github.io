import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Steppers from 'src/muiComponents/Steppers';
import PageTitle from 'src/muiComponents/PageTitle';
import Button from '@mui/material/Button';
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useBottomNavigationStore } from 'src/store'
import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth';

interface Props {
  userObj: User | null
}

function Specific({ userObj }: Props) {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [msgObj, setMsgObj] = useState<{id: string, round: number, displayName: string, connectedName: string, point: number, connectedId: string | null, creatorId: string}>(state.msgObj)
  const [num, setNum] = useState<number | null>(null)
  const [points, setPoints] = useState<number | null>(null)
  const [deleted, setDeleted] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  }, [])
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
    onSnapshot(doc(dbservice, `members/${msgObj.creatorId}`), (snapshot) => {
        const number = snapshot.data()?.points
        setNum(number)
      }
    )
  }, [])
  useEffect(() => {
    if (msgObj.connectedId !== null) {
      onSnapshot(doc(dbservice, `members/${msgObj.connectedId}`), (snapshot) => {
        const element = snapshot.data()?.points
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
      <PageTitle title={'카드 내용'} />
    <Card
      sx={{
        boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={'src/assets/pwa-512x512.png'}
      />
      <CardContent>
      <div className='flex justify-between'>
        <div>
          {msgObj.text.choose === 1 && <Chip label={`${msgObj.item} 빌리기`} />}
          {msgObj.text.choose === 2 && <Chip label={`${msgObj.item} 빌려주기`} />}
          {msgObj.creatorId === (userObj?.uid || null) && 
            <Chip label='내가 작성함' />
          }
        </div>
        <div>
          <div className='flex'>{msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting}에서</div>
          <div className='flex flex-col'>
            <div>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute}에 대여</div>
            <div>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute}에 반납</div>
          </div>
        </div>
      </div>
      <Divider />
      <div className='pt-3'>
        {msgObj.text.choose === 1 && 
          <div className='flex justify-center'>
            <div className='flex flex-col px-5 pt-5'>
              <div>
                빌리는 분
              </div>
              <div>
                {msgObj.displayName}
              </div>
            </div>
            <div className='flex flex-col'>
              <div>
              {msgObj.point} 포인트 지급
              </div>
              <div className='flex justify-start'>
                <HorizontalRuleIcon />
                <EastIcon />
                <HorizontalRuleIcon />
                <EastIcon />
              </div>
              <div className='flex justify-end'>
                <WestIcon />
                <HorizontalRuleIcon />
                <WestIcon />
                <HorizontalRuleIcon />
              </div>
              <div className='flex justify-end'>
                <BeachAccess />
              </div>
            </div>
            <div className='flex flex-col px-5 pt-5'>
              <div>
                빌려주는 분
              </div>
              <div>
                {msgObj.connectedName || '아직 없음'}
              </div>
            </div>
          </div>
        }
        {msgObj.text.choose === 2 && 
          <div className='flex justify-between'>
            <div>빌려주는 분: {msgObj.displayName}</div>
            <div>지급 포인트: {msgObj.point}</div>
            <div>빌리는 분: {msgObj.connectedName || '아직 없음'}</div>
          </div>
        }
        <Divider />
      </div>
      <div className='flex pt-5'>진행 단계: {msgObj.round}</div>
      <Steppers msgObj={msgObj} />
      <Divider />
      <div className='flex justify-center pt-5'>
        {deleted === false && userObj !== null &&
          <div className='flex justify-center'>
            <Btn msgObj={msgObj} isOwner={msgObj.creatorId === userObj.uid} uid={userObj.uid} displayName={userObj.displayName} userObj={userObj} num={num} points={points} />
          </div>
        }
        {deleted === false && userObj === null &&
          <div className='flex justify-center'>
            <Btn msgObj={msgObj} isOwner={false} uid={null} displayName={null} userObj={userObj} num={num} points={points} />
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
    </Card>
    </div>
  )
}

export default Specific
