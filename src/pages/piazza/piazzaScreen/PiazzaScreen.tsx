import { User } from 'firebase/auth'
import PiazzaScreenView from './PiazzaScreenView'

interface Props {
  chattingUser: {} | null
  isKeyboardOpen: boolean
  userObj: User
  handleMultiple: (newValue: boolean) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  multiple: boolean
}

function PiazzaScreen({
  chattingUser,
  isKeyboardOpen,
  userObj,
  multiple,
  handleMultiple,
  messagesList,
  handleMessagesList,
}: Props) {

  return (
    <>
      {isKeyboardOpen ?
        <div className='fixed bottom-[50px] w-screen h-full bg-light-3 dark:bg-dark-3 flex flex-col pt-[120px]'>
          <PiazzaScreenView userObj={userObj} multiple={multiple} handleMultiple={handleMultiple} messagesList={messagesList} handleMessagesList={handleMessagesList} />
        </div>
        :
        <div className='fixed bottom-[110px] w-screen h-[60%] bg-light-3 dark:bg-dark-3 flex flex-col'>
          <PiazzaScreenView userObj={userObj} multiple={multiple} handleMultiple={handleMultiple} messagesList={messagesList} handleMessagesList={handleMessagesList} />
        </div>
      }
    </>
  )
}

export default PiazzaScreen
