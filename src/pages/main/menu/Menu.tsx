import { User } from 'firebase/auth'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'src/components/ui/input-otp'
import { useSelectors } from 'src/hooks/useSelectors'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import useContextMenu from './useContextMenu'
import useGetToken from './useGetToken'
import useSetProfile from './useSetProfile'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User
}

const titles = {
  ko: '내 상태',
  en: 'My Status',
}

function Menu({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  useSetProfile(userObj)
  useGetToken(userObj)
  useContextMenu()
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <Accordions userObj={userObj} />
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {/* <PushNotificationButton /> */}
      {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>
  )
}

export default Menu
