import { User } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
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
const cards = {
  ko: '카드',
  en: 'Cards',
}
const messages = {
  ko: '메세지',
  en: 'Messages',
}

function Menu({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const cardAccordion = useSelector((state) => state.cardAccordion.value)
  const messageAccordion = useSelector((state) => state.messageAccordion.value)
  const dispatch = useDispatch()
  useSetProfile(userObj)
  useGetToken(userObj)
  useContextMenu()
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <Accordions userObj={userObj} />
      {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>
  )
}

export default Menu
