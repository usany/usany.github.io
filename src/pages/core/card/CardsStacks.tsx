import { User } from 'firebase/auth'
import { Skeleton } from 'src/components/ui/skeleton'
import CardsStacksViews from './CardsStacksViews'
import EmptyCard from './EmptyCard'
import { useBringCards } from './useBringCards'
import { useSelectors } from 'src/hooks'

function CardsStacks() {
  const profile = useSelectors((state) => state.profile.value)
  const { messages, cardLoaded, }: { messages: { round: number; creatorId: string }[]; cardLoaded: boolean } = useBringCards(profile)

  return (
    <div>
      {!cardLoaded && !messages.length && navigator.onLine &&
        <Skeleton className='w-full h-[260px] rounded bg-light-3 dark:bg-dark-3' />
      }
      {(!navigator.onLine || cardLoaded) && (
        <div>
          {navigator.onLine && !messages.filter((value) => {
            if (value.round !== 5) return value
          }).length ? (
            <EmptyCard />
          ) : (
            <CardsStacksViews
              messages={messages}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CardsStacks
