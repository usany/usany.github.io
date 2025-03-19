import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogTrigger
} from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import CardsViews from '../../main/card/CardsViews'
import Morphings from './Morphings'

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const MorphingDialogs = ({ message, isOwner, userObj, num, points }: Props) => {
  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const drawerOpenTrue = () => {
  //   setDrawerOpen(true)
  // }
  // const drawerOpenFalse = () => {
  //   setDrawerOpen(false)
  // }
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <CardsViews
          message={message}
          isOwner={isOwner}
          userObj={userObj}
          num={num}
          points={points}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <Morphings userObj={userObj} message={message} />
        {/* <MorphingDialogContent drawerOpen={drawerOpen} drawerOpenFalse={drawerOpenFalse}>
          <Specifics drawerOpenTrue={drawerOpenTrue} userObj={userObj} message={message} />
        </MorphingDialogContent> */}
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
