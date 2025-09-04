import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { User } from 'firebase/auth'
import { CreditCard, MessageCircleIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectors } from 'src/hooks'
import CardsStacks from 'src/pages/core/card/CardsStacks'
import MessageStacks from 'src/pages/core/chatting/MessageStacks'
import { cardOff, cardOn } from 'src/stateSlices/cardAccordionSlice'
import { messageOff, messageOn } from 'src/stateSlices/messageAccordionSlice'
import { useTexts } from 'src/hooks'
import AccordionsContents from './AccordionsContents'
import AccordionsTriggers from './AccordionsTriggers'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User
}

const cards = {
  ko: '카드',
  en: 'Cards',
}
const messages = {
  ko: '메세지',
  en: 'Messages',
}

function Accordions({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const langugaesIndex =
    languages === 'ko' || languages === 'en' ? languages : 'ko'
  const cardAccordion = useSelector((state) => state.cardAccordion.value)
  const messageAccordion = useSelector((state) => state.messageAccordion.value)
  const dispatch = useDispatch()
  const { card, message } = useTexts()
  const accordionItems = [
    {
      value: 'item-1',
      id: 'cardAccordion',
      item: <div className='flex gap-5'>
        <CreditCard />
        <>
          {card}
        </>
      </div>,
      onClick: () => {
        if (cardAccordion) {
          dispatch(cardOff())
        } else {
          dispatch(cardOn())
        }
      },
      content: <CardsStacks userObj={userObj} />,
    },
    {
      value: 'item-2',
      id: 'messageAccordion',
      item: <div className='flex gap-5'>
        <MessageCircleIcon />
        <>
          {message}
        </>
      </div>,
      onClick: () => {
        if (messageAccordion) {
          dispatch(messageOff())
        } else {
          dispatch(messageOn())
        }
      },
      content: <MessageStacks userObj={userObj} />,
    },
  ]
  return (
    <Accordion value={[cardAccordion, messageAccordion]} type="multiple">
      {accordionItems.map((value, index) => {
        return (
          <AccordionItem key={value.id} value={value.value}>
            <AccordionsTriggers value={value} />
            <AccordionsContents content={value.content} index={index} />
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordions
