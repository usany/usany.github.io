import { DndContext } from '@dnd-kit/core'
import { ClickAwayListener } from '@mui/material'
import { User } from 'firebase/auth'
import {
  doc,
  getDoc
} from 'firebase/firestore'
import { Ban } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { AnimatedList } from 'src/components/ui/animated-list'
import { useBringCards } from 'src/hooks/useBottomNavigation'
import { useSelectors } from 'src/hooks/useSelectors'
import Cards from 'src/pages/core/card/Cards'
import Droppable from 'src/pages/main/menu/Droppable'

const deleteMessage = (deletingMessage: { id: string }) => {
  const item = document.getElementById(deletingMessage.id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}
const handleDelete = async ({ id, changeLongPressCard }: { id: string }) => {
  const data = doc(dbservice, `num/${id}`)
  const message = await getDoc(data)
  const deletingMessage = { id: data.id, ...message.data() }
  deleteMessage(deletingMessage)
  // deleteDoc(data)
  // changeLongPressCard(null)
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
const CardDroppable = ({ longPressCard }: { longPressCard: string }) => {
  return (
    <Droppable>
      {longPressCard && (
        <div className="px-10">
          <div className="flex justify-center rounded bg-light-2 dark:bg-dark-2 p-5">
            <Ban />
          </div>
        </div>
      )}
    </Droppable>
  )
}
interface Props {
  userObj: User
}
function CardsStacks({ userObj }: Props) {
  const [longPressCard, setLongPressCard] = useState(null)
  const [onLongPress, setOnLongPress] = useState(0)
  const { messages, cardLoaded } = useBringCards(userObj)
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
      <DndContext
        onDragEnd={(element) => {
          if (element.over) {
            const id = element.active.id.toString()
            handleDelete({ id: id, changeLongPressCard: changeLongPressCard })
          }
        }}
      >
        {cardLoaded && (
          <div>
            {!messages.filter((value) => {
              if (value.round !== 5) return value
            }).length ? (
              <EmptyCard />
            ) : (
              <>
                <CardDroppable longPressCard={longPressCard} />
                <div
                  id="items"
                  className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full"
                >
                  {messages.map((value) => {
                    const isOwner = value.creatorId === userObj.uid
                    if (value.round !== 5) {
                      if (value.creatorId === userObj.uid) {
                        return (
                          <div
                            key={value.id}
                            id={value.id}
                            className="item-list flex justify-center"
                          >
                            <ClickAwayListener
                              onClickAway={() => {
                                if (longPressCard === value.id) {
                                  setOnLongPress(0)
                                  setLongPressCard(null)
                                }
                              }}
                            >
                              <div
                                onMouseDownCapture={() => {
                                  const longPress = value.id
                                  setLongPressCard(longPress)
                                }}
                                onTouchStartCapture={() => {
                                  const longPress = value.id
                                  setLongPressCard(longPress)
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
                                />
                              </div>
                            </ClickAwayListener>
                          </div>
                        )
                      } else if (value.connectedId === userObj.uid && value.round !== 1) {
                        return (
                          <div
                            key={value.id}
                            onMouseDownCapture={() => {
                              const longPress = value.id
                              setLongPressCard(longPress)
                            }}
                            onTouchStartCapture={() => {
                              const longPress = value.id
                              setLongPressCard(longPress)
                            }}
                          >
                            <AnimatedList>
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
                                deleteMessage={deleteMessage}
                              />
                            </AnimatedList>
                          </div>
                        )
                      }
                    }
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </DndContext>
    </div>
  )
}

export default CardsStacks
