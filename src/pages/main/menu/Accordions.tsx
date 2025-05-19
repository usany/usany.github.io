import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { User } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dbservice, messaging, storage } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import CardsStacks from 'src/pages/core/card/CardsStacks'
import MessageStacks from 'src/pages/core/chatting/MessageStacks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import { cardOff, cardOn } from 'src/stateSlices/cardAccordionSlice'
import { messageOff, messageOn } from 'src/stateSlices/messageAccordionSlice'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import useSetProfile from './useSetProfile'
import useGetToken from './useGetToken'
import useContextMenu from './useContextMenu'
import Accordions from './Accordions/Accordions'
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
