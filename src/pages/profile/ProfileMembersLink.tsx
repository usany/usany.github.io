import Card from '@mui/material/Card'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import useCardsBackground from '../../hooks/useCardsBackground'
import { Button } from '@mui/material'
import { doc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const ProfileMembersLink = ({otherUserProfile}) => {
  const {state} = useLocation()
  // const { colorTwo } = useCardsBackground()
  const { report } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const location = useLocation()
  const user = location.pathname !== '/' ? (state?.element || profile) : otherUserProfile
  return (
    <Link to={`/contact/?id=${user.uid}`} state={{ user: user }}>
      <div className="flex justify-center">
        <Button variant='outlined' onClick={() => {
          if (location.pathname === '/') {
            document.body.classList.remove('overflow-hidden')
          }
        }}>
          {report}
        </Button>
        {/* <Card sx={{ bgcolor: colorTwo }}>
          <div className="flex justify-center p-5">
            {report}
          </div>
        </Card> */}
      </div>
    </Link>
  )
}

export default ProfileMembersLink
