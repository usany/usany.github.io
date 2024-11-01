import Message from 'src/pages/Message'
import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'

const Actions = ({ userObj, setValue, counter, setCounter }: {
  userObj: {uid: string, displayName: string},
  setValue: (newState: number) => void,
  counter: number[],
  setCounter: (newState: number[]) => void
}) => {
  const {state} = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex text-2xl p-5'>
          {state.actions === 'completedLend' &&
            <div>
              {state.user}의 빌려주기 목록 
            </div>
          }
          {state.actions === 'completedBorrow' &&
            <div>
              {state.user}의 빌리기 목록 
            </div>
          }
      </div>
      {state.actions === 'completedLend' &&
        <div className='flex justify-center flex-wrap'>
          {state.lendRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)}/>)}
          {state.lendMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)}/>)}
        </div>
      }
      {state.actions === 'completedBorrow' &&
        <div className='flex justify-center flex-wrap'>
          {state.borrowRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)}/>)}
          {state.borrowMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)}/>)}
        </div>
      }
      <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div>
    </div>
  )
}

export default Actions
