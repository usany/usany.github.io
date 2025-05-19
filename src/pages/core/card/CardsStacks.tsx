import { DndContext } from '@dnd-kit/core'
import { User } from 'firebase/auth'
import {
  doc
} from 'firebase/firestore'
import { Ban } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useBringCards } from 'src/hooks/useBottomNavigation'
import { useSelectors } from 'src/hooks/useSelectors'
import Cards from 'src/pages/core/card/Cards'
import Droppable from 'src/pages/main/menu/Droppable'

const deleteMessage = (id: string) => {
  const item = document.getElementById(id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}
const handleDelete = async ({ id, changeLongPressCard }: { id: string, changeLongPressCard: (newValue: null) => void }) => {
  const data = doc(dbservice, `num/${id}`)
  // const message = await getDoc(data)
  const messageId = data.id
  deleteMessage(messageId)
  // deleteDoc(data)
  changeLongPressCard(null)
}
const emptyCards = {
  ko: '진행 카드가 없습니다',
  en: 'No cards',
}
const EmptyCard = () => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
        {emptyCards[index]}
      </div>
    </div>
  )
}
const CardDroppable = ({ longPressed }: { longPressed: boolean }) => {
  return (
    <Droppable>
      {longPressed && (
        <div className="px-10">
          <div className="flex justify-center rounded bg-light-2 dark:bg-dark-2 p-5">
            <Ban />
          </div>
        </div>
      )}
    </Droppable>
  )
}
const CardsStacksViewsCollection = ({ userObj, messages, longPressed, changeLongPressed }: { userObj: User, messages: { round: number, creatorId: string }[], longPressed: boolean, changeLongPressed: (newValue: boolean) => void }) => {
  const [longPressCard, setLongPressCard] = useState<string | null>(null)
  const [onLongPress, setOnLongPress] = useState(0)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressCard(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressCard) {
      setOnLongPress(0)
    }
  }, [longPressCard]);
  return (
    <div
      id="items"
      className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full"
    >
      {messages.map((value) => {
        const isOwner = value.creatorId === userObj.uid
        if (value.round !== 5) {
          if ((value.creatorId === userObj.uid) || (value.connectedId === userObj.uid && value.round !== 1)) {
            return (
              <div
                key={value.id}
                id={value.id}
                className="item-list flex justify-center"
              >
                <>
                  <div
                    onMouseDownCapture={() => {
                      if (!longPressCard) {
                        const longPress = value.id
                        setLongPressCard(longPress)
                      }
                    }}
                    onTouchStartCapture={() => {
                      if (!longPressCard) {
                        const longPress = value.id
                        setLongPressCard(longPress)
                      }
                    }}
                  >
                    <Cards
                      message={value}
                      isOwner={isOwner}
                      userObj={userObj}
                      num={null}
                      points={null}
                      onLongPress={onLongPress}
                      changeOnLongPress={(newValue) =>
                        setOnLongPress(newValue)
                      }
                      longPressCard={longPressCard}
                      changeLongPressCard={(newValue) =>
                        setLongPressCard(newValue)
                      }
                      deleteMessage={deleteMessage}
                      longPressed={longPressed}
                      changeLongPressed={changeLongPressed}
                    />
                  </div>
                </>
              </div>
            )
          }
        }
      })}
    </div>
  )
}
const CardsStacksViews = ({ userObj, messages }: { userObj: User, messages: { round: number, creatorId: string }[] }) => {
  const [longPressed, setLongPressed] = useState(false)
  const changeLongPressed = (newValue: boolean) => setLongPressed(newValue)
  return (
    <DndContext
      onDragEnd={(element) => {
        if (element.over) {
          const id = element.active.id.toString()
          handleDelete({ id: id, changeLongPressCard: changeLongPressCard })
        }
      }}
    >
      <CardDroppable longPressed={longPressed} />
      <CardsStacksViewsCollection userObj={userObj} messages={messages} longPressed={longPressed} changeLongPressed={changeLongPressed} />
    </DndContext>
  )
}
interface Props {
  userObj: User
}
function CardsStacks({ userObj }: Props) {
  const [longPressCard, setLongPressCard] = useState<string | null>(null)
  const [onLongPress, setOnLongPress] = useState(0)
  const { messages, cardLoaded }: { messages: { round: number, creatorId: string }[], cardLoaded: boolean } = useBringCards(userObj)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressCard(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressCard) {
      setOnLongPress(0)
    }
  }, [longPressCard]);

  return (
    <div>
      {cardLoaded && (
        <div>
          {!messages.filter((value) => {
            if (value.round !== 5) return value
          }).length ? (
            <EmptyCard />
          ) : (
            <CardsStacksViews userObj={userObj} messages={messages} />
          )}
        </div>
      )}
    </div>
  )
}

export default CardsStacks
