import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useBringCards } from 'src/hooks/useBottomNavigation'
import CardsStacksViews from './CardsStacksViews'
import EmptyCard from './EmptyCard'

interface Props {
  userObj: User
}
function CardsStacks({ userObj }: Props) {
  const [longPressCard, setLongPressCard] = useState<string | null>(null)
  const [onLongPress, setOnLongPress] = useState(0)
  const {
    messages,
    cardLoaded,
  }: { messages: { round: number; creatorId: string }[]; cardLoaded: boolean } =
    useBringCards(userObj)
  const changeLongPressCard = (newValue: string | null) =>
    setLongPressCard(newValue)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressCard(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressCard) {
      setOnLongPress(0)
    }
  }, [longPressCard])

  return (
    <div>
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
              changeLongPressCard={changeLongPressCard}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CardsStacks
