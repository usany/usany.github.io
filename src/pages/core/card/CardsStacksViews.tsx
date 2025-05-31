import { DndContext } from '@dnd-kit/core'
import { User } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import CardDroppable from './CardsDroppable'
import CardsStacksViewsCollection from './CardsStacksViewsCollection'
const deleteMessage = (id: string) => {
  console.log(id)
  const item = document.getElementById(id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}
const handleDelete = async ({
  id,
  changeLongPressCard,
}: {
  id: string
  changeLongPressCard: (newValue: null) => void
}) => {
  const data = doc(dbservice, `num/${id}`)
  const messageId = data.id
  deleteMessage(messageId)
  changeLongPressCard(null)
}

const CardsStacksViews = ({
  userObj,
  messages,
  // changeLongPressCard,
}: {
  userObj: User
  messages: { round: number; creatorId: string }[]
  changeLongPressCard: (newValue: string | null) => void
}) => {
  // const [longPressed, setLongPressed] = useState(false)
  // const changeLongPressed = (newValue: boolean) => setLongPressed(newValue)
  const [longPressCard, setLongPressCard] = useState('')
  const changeLongPressCard = (newValue) => setLongPressCard(newValue)
  return (
    <DndContext
      onDragEnd={(element) => {
        if (element.over) {
          const id = element.active.id.toString()
          handleDelete({ id: id, changeLongPressCard: changeLongPressCard })
          // setLongPressed(false)
        }
      }}
    >
      {longPressCard && <CardDroppable />}
      <CardsStacksViewsCollection
        userObj={userObj}
        messages={messages}
        // longPressed={longPressed}
        // changeLongPressed={changeLongPressed}
        longPressCard={longPressCard}
        changeLongPressCard={changeLongPressCard}
      />
    </DndContext>
  )
}

export default CardsStacksViews
