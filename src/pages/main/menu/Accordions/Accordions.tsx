import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { User } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectors } from 'src/hooks/useSelectors'
import CardsStacks from 'src/pages/core/card/CardsStacks'
import MessageStacks from 'src/pages/core/chatting/MessageStacks'
import { cardOff, cardOn } from 'src/stateSlices/cardAccordionSlice'
import { messageOff, messageOn } from 'src/stateSlices/messageAccordionSlice'
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
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const cardAccordion = useSelector((state) => state.cardAccordion.value)
  const messageAccordion = useSelector((state) => state.messageAccordion.value)
  const dispatch = useDispatch()
  const accordionItems = [
    {
      value: 'item-1',
      id: 'cardAccordion',
      item: cards[index],
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
      item: messages[index],
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
            <div className="flex justify-center sticky top-16 z-30 px-5">
              <div className="w-[1000px]">
                <button
                  onClick={() => {
                    document.getElementById(value.id)?.click()
                  }}
                  className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
                >
                  <div>{value.item}</div>
                  <AccordionTrigger
                    id={value.id}
                    onClick={value.onClick}
                  ></AccordionTrigger>
                </button>
              </div>
            </div>
            <div className={`flex justify-center ${index && 'px-5'}`}>
              {!index ? (
                <div className="w-[1000px]">
                  <AccordionContent className="text-sm max-w-[1000px]">
                    {value.content}
                  </AccordionContent>
                </div>
              ) : (
                <AccordionContent className="text-sm max-w-[1000px]">
                  {value.content}
                </AccordionContent>
              )}
            </div>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordions
