import { User } from 'firebase/auth'
import PiazzaScreenView from './PiazzaScreenView'

interface Props {
  isKeyboardOpen: boolean
  userObj: User
  messagesList: []
  handleMessagesList: (newValue: []) => void
}

function PiazzaScreen({
  isKeyboardOpen,
  userObj,
  messagesList,
  handleMessagesList,
  handleChatUid,
  handleChatDisplayName
}: Props) {

  return (
    <>
      {isKeyboardOpen ?
        <div className='fixed bottom-[50px] w-screen h-full bg-light-3 dark:bg-dark-3 flex flex-col pt-[120px]'>
          <PiazzaScreenView userObj={userObj} messagesList={messagesList} handleMessagesList={handleMessagesList}
            handleChatUid={handleChatUid}
            handleChatDisplayName={handleChatDisplayName}
          />
        </div>
        :
        <div className='fixed bottom-[110px] w-screen h-[60%] bg-light-3 dark:bg-dark-3 flex flex-col'>
          <PiazzaScreenView userObj={userObj} messagesList={messagesList} handleMessagesList={handleMessagesList}
            handleChatUid={handleChatUid}
            handleChatDisplayName={handleChatDisplayName}
          />
        </div>
      }
    </>
  )
}

export default PiazzaScreen
