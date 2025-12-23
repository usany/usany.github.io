import { DocumentData } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
import useSelectors from 'src/hooks/useSelectors'
interface Props {
  message: DocumentData
  longPressCard: string
  changeLongPressCard: (newValue: string) => void
  deleteMessage: () => void
  delayed: boolean
  delayedFalse: () => void
}

const Cards = ({
  message,
  longPressCard,
  changeLongPressCard,
}: Props) => {
  const cardsRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [messageValue, setMessageValue] = useState({})
  const profile = useSelectors((state) => state.profile.value)
  useEffect(() => {
    setMessageValue(message)
  }, [message])
  useLongPress(cardsRef, () => {
    if (location.pathname === '/') {
      changeLongPressCard(message.id)
    }
  })
  useEffect(() => {
    if (!longPressCard && location.pathname === '/') {
      changeLongPressCard('')
    }
  }, [longPressCard])
  const increaseRound = () => {
    if (messageValue.round === 1) {
      setMessageValue((prev) => {
        return {...prev, connectedId: profile.uid, connectedProfileImage: profile.profileImage, connectedProfileImageUrl: profile.profileImageUrl, connectedDefaultProfile: profile.defaultProfile, round: prev.round+1}
      })
    } else {
      setMessageValue((prev) => {
        return (
          {...prev, round: prev.round+1}
        )
      })
    }
  }
  const decreaseRound = () => {
    if (messageValue.round === 2) {
      setMessageValue((prev) => {
        return {...prev, connectedId: '', connectedProfileImage: false, connectedProfileImageUrl: '', connectedDefaultProfile: '', round: prev.round-1}
      })
    } else {
      setMessageValue((prev) => {
        return (
          {...prev, round: prev.round-1}
        )
      })
    }
  }
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard ? (
        <>
          {longPressCard === message.id ? (
            <CardsLongPressed
              longPressCard={longPressCard}
              message={messageValue}
              changeLongPressCard={changeLongPressCard}
            />
          ) : (
            <CardsViews message={messageValue} />
          )}
        </>
      ) : (
        <>
          {searchParams.get('id') ?
            <CardsViews message={messageValue} />
            :
            <MorphingDialogs
              message={messageValue}
              changeMessage={(newValue) => setMessageValue(newValue)}
              increaseRound={increaseRound}
              decreaseRound={decreaseRound}
            />
          }
        </>
      )}
    </div>
  )
}

export default Cards
