import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dbservice } from 'src/baseApi/serverbase';
import Cards from 'src/pages/core/card/Cards';

const Carousels = ({ user, cards }) => {
  const {state} = useLocation()
  const dispatch = useDispatch()
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  const [messagesList, setMessagesList] = useState([])
  const [cardNumber, setCardNumber] = useState(1)
  const completedAction = useSelector(state => state.completedAction.value)
  const handleCardNumber = (newValue) => setCardNumber(newValue)
  useEffect(() => {
    const getMessage = async () => {
      const messagesRef = query(collection(dbservice, 'num'))
      const querySnap = await getDocs(messagesRef)
      const messagesArray = []
      querySnap.forEach((docSnap) => {
        const messageId = docSnap.id
        const messageObj = docSnap.data()
        const message = { id: messageId, ...messageObj }
        if (messageObj.creatorId === user.uid || messageObj.connectedId === user.uid) {
          messagesArray.push(message)
        }
      })
      setMessagesList(messagesArray)
    }
    getMessage()
  }, [])

  const borrowList = messagesList.map((element) => {
    if (element.round === 5) {
      if (element.creatorId === user.uid && element.text.choose === 1) {
        return (
          <CarouselItem key={element.id} className='flex justify-center'>
            <Cards message={element} isOwner={true} userObj={user} num={null} points={null} />
          </CarouselItem>
        )
      } else if (element.creatorId !== user.uid && element.text.choose === 2) {
        return (
          <CarouselItem key={element.id} className='flex justify-center'>
            <Cards message={element} isOwner={false} userObj={user} num={null} points={null} />
          </CarouselItem>
        )
      }
    }
  }).filter((element) => {
    if (element) return element
  })
  const lendList = messagesList.map((element) => {
    if (element.round === 5) {
      if (element.creatorId === user.uid && element.text.choose === 2) {
        return (
          <CarouselItem key={element.id} className='flex justify-center'>
            <Cards message={element} isOwner={true} userObj={user} num={null} points={null} />
          </CarouselItem>
        )
      } else if (element.creatorId !== user.uid && element.text.choose === 1) {
        return (
          <CarouselItem key={element.id} className='flex justify-center'>
            <Cards message={element} isOwner={false} userObj={user} num={null} points={null} />
          </CarouselItem>
        )
      }
    }
  }).filter((element) => {
    if (element) return element
  })
  const mergedList = borrowList.concat(lendList)
  const selectedList = completedAction ? completedAction === 'borrow' ? borrowList : lendList : mergedList
  useEffect(() => {
    setCardNumber(1)
  }, [completedAction])

  return (
    <div className='flex flex-col gap-5 items-center'>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[50vw]"
        handleCardNumber={handleCardNumber}
      >
        <CarouselContent className='min-w-[265px]'>
          {selectedList}
        </CarouselContent>
        <div onClick={() => setCardNumber(cardNumber - 1)}>
          <CarouselPrevious />
        </div>
        <div onClick={() => setCardNumber(cardNumber + 1)}>
          <CarouselNext />
        </div>
      </Carousel>
      <div>{completedAction ? completedAction === 'borrow' ? '빌리기: ' : '빌려주기: ' : '활동 횟수: '} {cardNumber}/{selectedList.length}</div>
    </div>
  )
}

export default Carousels
