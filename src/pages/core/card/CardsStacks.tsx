import { User } from 'firebase/auth'
import { Skeleton } from 'src/components/ui/skeleton'
import CardsStacksViews from './CardsStacksViews'
import EmptyCard from './EmptyCard'
import { useBringCards } from './useBringCards'

interface Props {
  userObj: User
}
function CardsStacks({ userObj }: Props) {
  // const [longPressCard, setLongPressCard] = useState<string | null>(null)
  // const [onLongPress, setOnLongPress] = useState(0)
  const { messages, cardLoaded, }: { messages: { round: number; creatorId: string }[]; cardLoaded: boolean } = useBringCards(userObj)
  console.log(messages)
  // const changeLongPressCard = (newValue: string | null) => setLongPressCard(newValue)
  // useEffect(() => {
  //   if (!onLongPress) {
  //     setLongPressCard(null)
  //   }
  // }, [onLongPress])
  // useEffect(() => {
  //   if (!longPressCard) {
  //     setOnLongPress(0)
  //   }
  // }, [longPressCard])

  return (
    <div>
      {!messages.length &&
        <Skeleton className='w-full h-[260px] rounded bg-light-2 dark:bg-dark-2' />
      }
      {cardLoaded && (
        <div>
          {!messages.filter((value) => {
            if (value.round !== 5) return value
          }).length ? (
            <EmptyCard />
          ) : (
            <CardsStacksViews
              userObj={userObj}
              messages={messages}
            // changeLongPressCard={changeLongPressCard}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CardsStacks
