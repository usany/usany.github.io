import { User } from 'firebase/auth'
import PiazzaMorphingDialogAudioCall from './PiazzaMorphingDialogAudioCall'
import PiazzaMorphingDialogVideoCall from './PiazzaMorphingDialogVideoCall'

interface PiazzaMorphingDialogProps {
  userObj: User
  chattingUser: any
  conversation: string
}

function PiazzaMorphingDialog({ userObj, chattingUser, conversation }: PiazzaMorphingDialogProps) {
  return (
    <>
      <PiazzaMorphingDialogVideoCall
        userObj={userObj}
        chattingUser={chattingUser}
        conversation={conversation}
      />
      <PiazzaMorphingDialogAudioCall
        userObj={userObj}
        chattingUser={chattingUser}
        conversation={conversation}
      />
    </>
  )
}

export default PiazzaMorphingDialog
