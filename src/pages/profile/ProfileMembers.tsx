import Card from '@mui/material/Card'
import { Link, useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'
import useCardsBackground from '../../hooks/useCardsBackground'
import Popups from '../core/Popups'
import ProfileMembersDrawersContent from './ProfileMembersDrawersContent'
import ProfileMembersDrawersTitle from './ProfileMembersDrawersTitle'
import ProfileMembersDrawersTrigger from './ProfileMembersDrawersTrigger'
import ProfileMembersPasswordContent from './ProfileMembersPasswordContent'

const ProfileMembers = () => {
  const {state} = useLocation()
  const { colorTwo } = useCardsBackground()
  const { report } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  return (
    <div className="flex justify-center p-5">
      {user.uid === profile?.uid ? (
        <div className="grid grid-flow-row grid-cols-2 justify-center">
          <Popups
            trigger={<ProfileMembersDrawersTrigger isPassword={true}/>}
            title={<ProfileMembersDrawersTitle isPassword={true}/>}
            content={<ProfileMembersPasswordContent />}
          />
          <Popups
            trigger={<ProfileMembersDrawersTrigger isPassword={false}/>}
            title={<ProfileMembersDrawersTitle isPassword={false}/>}
            content={<ProfileMembersDrawersContent user={user} />}
          />
        </div>
      ) : (
        <Link to={`/contact/?id=${user.uid}`} state={{ user: user }}>
          <div className="flex justify-center">
            <Card sx={{ bgcolor: colorTwo }}>
              <div className="flex justify-center p-5">
                {report}
              </div>
            </Card>
          </div>
        </Link>
      )}
    </div>
  )
}

export default ProfileMembers
