import {
  MorphingDialogContent
} from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import {
  useState
} from 'react'
import Specifics from 'src/pages/core/specifics/Specifics'

interface Props {
  message: { id: string; text: object }
  userObj: User | null
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
