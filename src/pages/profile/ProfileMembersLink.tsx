import Card from '@mui/material/Card'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import useCardsBackground from '../../hooks/useCardsBackground'
import { Button } from '@mui/material'
import { doc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const ProfileMembersLink = () => {
  const {state} = useLocation()
  // const { colorTwo } = useCardsBackground()
  const { report } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  let user = state?.element || profile
  const location = useLocation()
  if (location.pathname === '/') {
    const ref = doc(dbservice, `member/${}`)
  }
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
