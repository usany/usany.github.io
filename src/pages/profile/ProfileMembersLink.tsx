import Card from '@mui/material/Card'
import { Link, useLocation } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import useCardsBackground from '../../hooks/useCardsBackground'
import { Button } from '@mui/material'

const ProfileMembersLink = () => {
  const {state} = useLocation()
  const { colorTwo } = useCardsBackground()
  const { report } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  return (
    <Link to={`/contact/?id=${user.uid}`} state={{ user: user }}>
      <div className="flex justify-center">
        <Button variant='outlined'>
          {report}
        </Button>
        <Card sx={{ bgcolor: colorTwo }}>
          <div className="flex justify-center p-5">
            {report}
          </div>
        </Card>
      </div>
    </Link>
  )
}

export default ProfileMembersLink
