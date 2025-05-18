import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { User } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectors } from 'src/hooks/useSelectors'
import CardsStacks from 'src/pages/core/card/CardsStacks'
import { cardOff, cardOn } from 'src/stateSlices/cardAccordionSlice'
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

function Accordions({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const cardAccordion = useSelector((state) => state.cardAccordion.value)
  const messageAccordion = useSelector((state) => state.messageAccordion.value)
  const dispatch = useDispatch()
  return (
    <AccordionItem value="item-1">
      <div className="flex justify-center sticky top-16 z-30 px-5">
        <div className="w-[1000px]">
          <button
            onClick={() => {
              document.getElementById('cardAccordion')?.click()
            }}
            className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
          >
            <div>{cards[index]}</div>
            <AccordionTrigger
              id="cardAccordion"
              onClick={() => {
                if (cardAccordion) {
                  dispatch(cardOff())
                } else {
                  dispatch(cardOn())
                }
              }}
            ></AccordionTrigger>
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[1000px]">
          <AccordionContent className="text-sm">
            <CardsStacks userObj={userObj} />
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  )
}

export default Accordions
