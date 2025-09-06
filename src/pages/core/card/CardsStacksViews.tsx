import { DndContext } from '@dnd-kit/core';
import { User } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import CardDroppable from './CardsDroppable';
import CardsStacksViewsCollection from './CardsStacksViewsCollection';
import { useSelectors } from 'src/hooks';
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
  userObj,
  changeLongPressCard,
}: {
  id: string
  changeLongPressCard: (newValue: null) => void
}) => {
  const data = doc(dbservice, `num/${id}`)
  const messageId = data.id
  await deleteDoc(doc(dbservice, `num/${id}`));
  const userRef = doc(dbservice, `members/${userObj.uid}`)
  const userSnap = await getDoc(userRef)
  const newMessages = userSnap.data()?.createdCards.filter((element) => element !== id)
  console.log(newMessages)
  updateDoc(userRef, { createdCards: newMessages })
  deleteMessage(messageId)
  changeLongPressCard(null)
}

const CardsStacksViews = ({
  userObj,
  messages,
}: {
  userObj: User
  messages: { round: number; creatorId: string }[]
}) => {
  const [longPressCard, setLongPressCard] = useState('')
  const profile = useSelectors((state) => state.profile.value)
  const changeLongPressCard = (newValue) => setLongPressCard(newValue)
  return (
    <DndContext
      onDragEnd={(element) => {
        if (element.over) {
          const id = element.active.id.toString()
          handleDelete({ id: id, userObj: profile, changeLongPressCard: changeLongPressCard })
        }
      }}
    >
      {longPressCard && <CardDroppable />}
      <CardsStacksViewsCollection
        userObj={profile}
        messages={messages}
        longPressCard={longPressCard}
        changeLongPressCard={changeLongPressCard}
      />
    </DndContext>
  )
}

export default CardsStacksViews
