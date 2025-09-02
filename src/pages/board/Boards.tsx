import { User } from 'firebase/auth'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { SwipeableViews } from 'src/pages/core/SwipeableViews'
import { useImmer } from 'use-immer'
import locationsBuildings from '../add/locationsBuildings'
import LayoutBoard from './LayoutBoard'
import Board from './Board'

const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Usan', 'Yangsan'],
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All locations', ...locationsBuildings['en']],
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older'],
}
const options = [items.ko, locations.ko, time.ko]
interface Props {
  userObj: User | null
}

function Boards({ userObj }: Props) {
  const [messages, setMessages] = useState<Array<object>>([])
  const [selectedValues, setSelectedValues] = useImmer([
    {
      id: 'selectedValueOne',
      value: '전체 아이템',
    },
    {
      id: 'selectedValueTwo',
      value: '전체 장소',
    },
    {
      id: 'selectedValueThree',
      value: '최신순',
    },
  ])
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedSearchParams = [
    {
      id: 'selectedValueOne',
      value: searchParams.get('selectedValueOne') || '전체 아이템',
    },
    {
      id: 'selectedValueTwo',
      value: searchParams.get('selectedValueTwo') || '전체 장소',
    },
    {
      id: 'selectedValueThree',
      value: searchParams.get('selectedValueThree') || '최신순',
    },
  ]
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])
  useEffect(() => {
    const bringMessages = async () => {
      let order = 'asc'
      if (selectedValues[2].value === '최신순' || !selectedValues[2].value) {
        order = 'desc'
      }
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', order),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      docs.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() })
      })
      setMessages(newArray)
    }
    if (userObj) {
      bringMessages()
    }
  }, [selectedValues[2].value])
  useEffect(() => {
    if (!window.location.search) {
      navigate('/board?action=borrow')
    } else {
      selectedSearchParams.map((element, index) => {
        if (options[index].indexOf(element.value) === -1) {
          navigate('/add?action=borrow')
        }
      })
    }
  }, [])

  return (
    <>
      {userObj && userCertificated ? (
        <Board userObj={userObj} />
      ) : (
        <SwipeableViews>
          <LayoutBoard borrow={true} />
          <LayoutBoard borrow={false} />
        </SwipeableViews>
      )}
    </>
  )
}

export default Boards
