import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useContext,
  useReducer,
  Suspense,
  lazy,
} from 'react'
import Specifics from 'src/pages/core/specifics/Specifics'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import CardsViews from '../../main/card/CardsViews'
import { User } from 'firebase/auth'

interface Props {
  msgObj: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const Morphings = ({ message, userObj }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerOpenTrue = () => {
    setDrawerOpen(true)
  }
  const drawerOpenFalse = () => {
    setDrawerOpen(false)
  }
  return (
    <MorphingDialogContent
      drawerOpen={drawerOpen}
      drawerOpenFalse={drawerOpenFalse}
    >
      <Specifics
        drawerOpenTrue={drawerOpenTrue}
        userObj={userObj}
        message={message}
      />
    </MorphingDialogContent>
  )
}

export default Morphings
