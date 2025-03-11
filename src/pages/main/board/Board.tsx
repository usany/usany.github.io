import { User } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { SwipeableViews } from 'src/navigate/SwipeableViews'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import BoardMap from 'src/pages/main/board/boardMap/BoardMap'
import FilterDialogs from 'src/pages/main/FilterDialogs'
import { useImmer } from 'use-immer'
import CardsList from './cardsList/CardList'

interface Props {
  userObj: User | null
  borrow: boolean
}

function Notice({ userObj, borrow }: Props) {
  const [messages, setMessages] = useState<Array<object>>([])
  const [selectedValues, setSelectedValues] = useImmer([
    {
      id: 'selectedValueOne',
      value: '전체',
    },
    {
      id: 'selectedValueTwo',
      value: '전체',
    },
    {
      id: 'selectedValueThree',
      value: '최신순',
    },
  ])
  const [onMarker, setOnMarker] = useState(false)
  const onMarkerTrue = () => setOnMarker(true)
  const onMarkerFalse = () => setOnMarker(false)
  const handleSelectedValues = ({
    id,
    newValue,
  }: {
    id: string
    newValue: string
  }) => {
    setSelectedValues((values) => {
      const value = values.find((value) => value.id === id)
      if (value) {
        value.value = newValue
      }
    })
  }

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  useEffect(() => {
    if (selectedValues[2].value === '최신순' || !selectedValues[2].value) {
      onSnapshot(
        query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            }
          })
          setMessages(newArray)
        },
      )
    } else {
      onSnapshot(
        query(collection(dbservice, 'num'), orderBy('creatorClock')),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            }
          })
          setMessages(newArray)
        },
      )
    }
  }, [selectedValues[2].value])

  return (
    <div>
      {' '}
      {/* <div className="flex justify-between text-2xl">
        <PageTitle title={`${borrow ? "빌리기" : "빌려주기"} 카드 목록`} />
      </div> */}
      {/* <div className="sticky top-20 p-5">카드 목록</div>
      <div className="sticky top-20 p-5">카드 목록 목록</div> */}
      <SwipeableViews>
        <PageTitle title={`빌리기 카드 목록`} />
        <PageTitle title={`빌려주기 카드 목록`} />
        {/* <div className="flex justify-between text-2xl">
        </div>
        <div className="flex justify-between text-2xl">
        </div> */}
      </SwipeableViews>
      <BoardMap
        onMarker={onMarker}
        onMarkerTrue={onMarkerTrue}
        onMarkerFalse={onMarkerFalse}
      />
      <div>
        <div className="flex p-3 sticky top-16 z-30 justify-between bg-light-3 dark:bg-dark-3">
          <div className="pt-1">카드 목록</div>
          <div className="flex gap-1">
            {!onMarker && (
              <FilterDialogs
                selectedValues={selectedValues}
                handleSelectedValues={handleSelectedValues}
              />
            )}
          </div>
        </div>
        <SwipeableViews>
          <CardsList
            choose={1}
            messages={messages}
            selectedValues={selectedValues}
            userObj={userObj}
          />
          <CardsList
            choose={2}
            messages={messages}
            selectedValues={selectedValues}
            userObj={userObj}
          />
        </SwipeableViews>
      </div>
    </div>
  )
}

export default Notice
