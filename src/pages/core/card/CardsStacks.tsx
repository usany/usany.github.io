import { DocumentData } from 'firebase/firestore'
import { Skeleton } from 'src/components/ui/skeleton'
import useSelectors from 'src/hooks/useSelectors'
import CardsStacksViews from './CardsStacksViews'
import EmptyCard from './EmptyCard'
import { useBringCards } from './useBringCards'

function CardsStacks() {
  const profile = useSelectors((state) => state.profile.value)
  const { messages, cardLoaded }: { messages: DocumentData[], cardLoaded: boolean } = useBringCards(profile)

  return (
    <div>
      {!cardLoaded && !messages.length && navigator.onLine &&
        <Skeleton className='w-full h-[260px] rounded bg-light-3 dark:bg-dark-3' />
      }
      {(!navigator.onLine || cardLoaded) && (
        <>
          {navigator.onLine && !messages.filter((value: DocumentData) => {
            if (value.round !== 5) return value
          }).length ? (
            <EmptyCard />
          ) : (
            <CardsStacksViews
              messages={messages}
            />
          )}
        </>
      )}
    </div>
  )
}

export default CardsStacks
