import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Cards from './Cards'
const deleteMessage = (id: string) => {
  console.log(id)
  const item = document.getElementById(id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}

const CardsStacksViewsCollection = ({
  userObj,
  messages,
  longPressed,
  changeLongPressed,
}: {
  userObj: User
  messages: { round: number; creatorId: string }[]
  longPressed: boolean
  changeLongPressed: (newValue: boolean) => void
}) => {
  const [longPressCard, setLongPressCard] = useState<string | null>(null)
  const [onLongPress, setOnLongPress] = useState(0)
  const [delayed, setDelayed] = useState(true)
  const delayedTrue = () => setDelayed(true)
  const delayedFalse = () => setDelayed(false)
  useEffect(() => {
    if (!delayed) {
      setTimeout(() => delayedTrue(), 500)
    }
  })
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
    <div
      id="items"
      className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full"
    >
      {messages.map((value) => {
        const isOwner = value.creatorId === userObj.uid
        if (value.round !== 5) {
          if (
            value.creatorId === userObj.uid ||
            (value.connectedId === userObj.uid && value.round !== 1)
          ) {
            return (
              <div
                key={value.id}
                id={value.id}
                className="item-list flex justify-center"
              >
                <div
                // onMouseDownCapture={() => {
                //   const longPress = value.id
                //   setLongPressCard(longPress)
                // }}
                // onTouchStartCapture={() => {
                //   const longPress = value.id
                //   setLongPressCard(longPress)
                // }}
                >
                  <Cards
                    message={value}
                    isOwner={isOwner}
                    userObj={userObj}
                    num={null}
                    points={null}
                    onLongPress={onLongPress}
                    changeOnLongPress={(newValue) => setOnLongPress(newValue)}
                    longPressCard={longPressCard}
                    changeLongPressCard={(newValue) =>
                      setLongPressCard(newValue)
                    }
                    deleteMessage={deleteMessage}
                    longPressed={longPressed}
                    changeLongPressed={changeLongPressed}
                    delayed={delayed}
                    delayedFalse={delayedFalse}
                  />
                </div>
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export default CardsStacksViewsCollection
