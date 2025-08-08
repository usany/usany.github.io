import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Chip } from '@mui/material'
import { AdvancedMarker, InfoWindow, Map, Pin } from '@vis.gl/react-google-maps'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { MapIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import FilterDialogs from 'src/pages/board/FilterDialogs/FilterDialogs'

const registeredMap = {
  ko: '등록 지도',
  en: 'Registered map',
}
const registeredMapExplanation = {
  ko: '표시된 곳을 선택하면 해당하는 내용만 확인할 수 있어요',
  en: 'Click a marker to filter specific location',
}
const selectItems = [
  {
    ko: '우산',
    en: 'Usan',
  },
  {
    ko: '양산',
    en: 'Yangsan',
  },
]

interface Props {
  onMarker: boolean
  onMarkerTrue: () => void
  onMarkerFalse: () => void
}
const area = [
  {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  },
]

const markers = [
  {
    label: {
      ko: '중도',
      en: 'Central library',
    },
    location: { lat: 37.5970966, lng: 127.0527314 },
  },
  {
    label: {
      ko: '네오르네상스관',
      en: 'Neo-Renaissance',
    },
    location: { lat: 37.5948201, lng: 127.053091 },
  },
  {
    label: {
      ko: '푸른솔',
      en: 'Pureunsol',
    },
    location: { lat: 37.5941125, lng: 127.0557743 },
  },
  {
    label: {
      ko: '간호이과대',
      en: 'Nursing Science & Science',
    },
    location: { lat: 37.5960528, lng: 127.0536951 },
  },
  {
    label: {
      ko: '문과대',
      en: 'Humanities',
    },
    location: { lat: 37.5971991, lng: 127.0539612 },
  },
  {
    label: {
      ko: '청운',
      en: 'Cheongwoon',
    },
    location: { lat: 37.594732, lng: 127.0517775 },
  },
  {
    label: {
      ko: '의과대',
      en: 'Medicine',
    },
    location: { lat: 37.5939, lng: 127.0549 },
  },
  {
    label: {
      ko: '경영대',
      en: 'Business',
    },
    location: { lat: 37.5967052, lng: 127.0552861 },
  },
  {
    label: {
      ko: '치과병원',
      en: 'Dental Hospital',
    },
    location: { lat: 37.594054, lng: 127.0531189 },
  },
]
const defaultLocation = markers[0].location
function BoardMap({
  mapAccordion,
  mapAccordionToggle,
  onMarker,
  onMarkerTrue,
  onMarkerFalse,
  selectedValues,
  handleSelectedValues,
}: Props) {
  const [messages, setMessages] = useState<Array<object>>([])
  // const [mapAccordion, setMapAccordion] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [items, setItems] = useState({
    usanOne: 0,
    usanTwo: 0,
    yangsanOne: 0,
    yangsanTwo: 0,
  })
  const [choose, setChoose] = useState(false)
  const languages = useSelectors((state) => state.languages.value)
  const selection = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const onLine = useSelectors((state) => state.onLine.value)
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
        // onSnapshot(
        //   query(collection(dbservice, "num"), orderBy("creatorClock", order)),
        //   (snapshot) => {
        //     const newArray = snapshot.docs.map((document) => {
        //       return {
        //         id: document.id,
        //         ...document.data(),
        //       };
        //     });
        //     setMessages(newArray);
        //   }
        // );
      } else {
        // onSnapshot(
        //   query(collection(dbservice, "num"), orderBy("creatorClock", order)),
        //   (snapshot) => {
        //     const newArray = snapshot.docs.map((document) => {
        //       return {
        //         id: document.id,
        //         ...document.data(),
        //       };
        //     });
        //     setMessages(newArray);
        //   }
        // );
      }
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', order),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      let usanOneCount = 0
      let usanTwoCount = 0
      let yangsanOneCount = 0
      let yangsanTwoCount = 0
      docs.forEach((doc) => {
        newArray.push(doc.data())
        if (doc.data().text.count === selectedValues[1].value) {
          if (doc.data().item === '우산') {
            if (doc.data().text.choose === 1) {
              usanOneCount += 1
            } else if (doc.data().text.choose === 2) {
              usanTwoCount += 1
            }
          } else if (doc.data().item === '양산') {
            if (doc.data().text.choose === 1) {
              yangsanOneCount += 1
            } else if (doc.data().text.choose === 2) {
              yangsanTwoCount += 1
            }
          }
        }
        // console.log(doc.data())
      })
      setMessages(newArray)
      setItems({
        usanOne: usanOneCount,
        usanTwo: usanTwoCount,
        yangsanOne: yangsanOneCount,
        yangsanTwo: yangsanTwoCount,
      })
    }
    bringMessages()
  }, [selectedValues[1].value])

  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: 'selectedValueTwo', newValue: newValue.ko })
    setSelectedLocation(newValue.en)
  }
  const onClickMarkerItem = (newValue) => {
    handleSelectedValues({ id: 'selectedValueOne', newValue: newValue })
  }
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <button
            onClick={() => {
              document.getElementById('boardMap')?.click()
              console.log(document.getElementsByClassName('dismissButton'))
              setTimeout(
                () =>
                  document.getElementsByClassName('dismissButton')[0]?.click(),
                500,
              )
              setTimeout(
                () =>
                  document.getElementsByClassName('dismissButton')[0]?.click(),
                1500,
              )
            }}
            className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
          >
            <div className="flex gap-5">
              <MapIcon />
              <div>{registeredMap[selection]}</div>
            </div>
            <AccordionTrigger
              id="boardMap"
              onClick={() => mapAccordionToggle()}
            ></AccordionTrigger>
          </button>
          <AccordionContent>
            <div>
              {/* <div className="p-5">
                59.9156636,10.7507967 표시된 곳을 선택하면 해당하는 내용만
                확인할 수 있어요
              </div> */}
              {selectedValues[1].value === '전체 장소' ? (
                <div className="flex p-5">
                  {onLine && registeredMapExplanation[selection]}
                </div>
              ) : (
                <div className="flex p-5">
                  <FilterDialogs
                    selectedValues={selectedValues}
                    handleSelectedValues={handleSelectedValues}
                  />
                </div>
              )}
            </div>
            <div className="w-full h-[300px]">
              {onLine ? (
                <Map
                  mapId={import.meta.env.VITE_MAPID}
                  defaultCenter={defaultLocation}
                  // defaultCenter={{ lat: 37.5968367, lng: 127.0518435 }}
                  defaultZoom={17}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                >
                  {markers.map((value) => {
                    return (
                      <AdvancedMarker
                        onClick={() => {
                          onClickMarker(value.label)
                          onMarkerTrue()
                        }}
                        position={value.location}
                      >
                        <Pin
                          background={'#1f9d58'}
                          borderColor={'#006425'}
                          glyphColor={'#60d98f'}
                        />
                      </AdvancedMarker>
                    )
                  })}
                  <InfoWindow
                    minWidth={290}
                    position={
                      markers.find(
                        (element) =>
                          element.label.ko === selectedValues[1].value,
                      )?.location
                    }
                    onClose={() => {
                      onClickMarker({ ko: '전체 장소' })
                      if (choose) {
                        onClickMarkerItem('전체 아이템')
                        setChoose(false)
                      }
                      onMarkerFalse()
                    }}
                  >
                    <div className="flex flex-col text-black">
                      <div className="flex justify-center">
                        {languages === 'ko'
                          ? selectedValues[1].value
                          : selectedLocation}
                      </div>
                      {selectItems.map((value, index) => {
                        return (
                          <div className="flex gap-5">
                            <div className="pt-1">
                              <Chip
                                label={`${selectItems[index][selection]}`}
                                onClick={() => {
                                  setChoose(true)
                                  onClickMarkerItem(`${selectItems[index].ko}`)
                                }}
                              />
                            </div>
                            <div className="pt-3">
                              {languages === 'ko' ? '빌리기' : 'Borrowing'}:{' '}
                              {index ? items.yangsanOne : items.usanOne}{' '}
                              {languages === 'ko' ? '요청' : 'requests'}
                            </div>
                            <div className="pt-3">
                              {languages === 'ko' ? '빌려주기' : 'Lending'}:{' '}
                              {index ? items.yangsanTwo : items.usanTwo}{' '}
                              {languages === 'ko' ? '요청' : 'requests'}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </InfoWindow>
                </Map>
              ) : (
                <div className="flex justify-center">
                  네트워크 연결이 필요합니다
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default BoardMap
