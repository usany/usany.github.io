import { useEffect, useState } from 'react'
import { useSelectors } from 'src/hooks'
import Cards from './Cards'
const deleteMessage = (id: string) => {
  const item = document.getElementById(id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}

const CardsStacksViewsCollection = ({
  messages,
  longPressCard,
  changeLongPressCard
}: {
  messages: { round: number; creatorId: string }[]
  longPressed: boolean
  changeLongPressed: (newValue: boolean) => void
}) => {
  const [delayed, setDelayed] = useState(true)
  const delayedTrue = () => setDelayed(true)
  const delayedFalse = () => setDelayed(false)
  const onLine = useSelectors(state => state.onLine.value)
  const profile = useSelectors((state) => state.profile.value)

  useEffect(() => {
    if (!delayed) {
      setTimeout(() => delayedTrue(), 250)
    }
  })
  if (messages.length) {
    localStorage.setItem('cards', JSON.stringify(messages))
  }
  const messagesArray = onLine ? messages : JSON.parse(localStorage.getItem('cards') || '[]')
  return (
    <div
      id="items"
      className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full"
    >
      {messagesArray.map((value, index) => {
        const isOwner = value.creatorId === profile?.uid
        if (value.round !== 5) {
          if (
            value.creatorId === profile?.uid ||
            (value.connectedId === profile?.uid && value.round !== 1)
          ) {
            return (
              <div
                key={value.id}
                id={value.id}
                className="item-list flex justify-center"
              >
                <Cards
                  message={value}
                  isOwner={isOwner}
                  num={null}
                  points={null}
                  longPressCard={longPressCard}
                  changeLongPressCard={changeLongPressCard}
                  deleteMessage={deleteMessage}
                  delayed={delayed}
                  delayedFalse={delayedFalse}
                />
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export default CardsStacksViewsCollection
