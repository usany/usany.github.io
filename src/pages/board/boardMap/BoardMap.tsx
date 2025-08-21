import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { MapIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
<<<<<<< HEAD
=======
import { useSearchParams } from 'react-router-dom'
>>>>>>> main
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import locationsCollectionLetters from 'src/pages/add/locationsCollectionLetters'
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
  selectedValues: object
  handleSelectedValues: () => void
}
// const area = [
//   {
//     westSouth: { lat: 37.5927551, lng: 127.047462 },
//     westNorth: { lat: 37.6010743, lng: 127.047462 },
//     eastSouth: { lat: 37.5927551, lng: 127.0571999 },
//     eastNorth: { lat: 37.6010743, lng: 127.0571999 },
//   },
// ]

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
  selectedValues,
  handleSelectedValues,
  // markings,
  // changeMarkings,
}: Props) {
  // const [messages, setMessages] = useState<Array<object>>([])
  // const [mapAccordion, setMapAccordion] = useState(false);
  const [items, setItems] = useState({
    cl: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    cw: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    p: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    g: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    k: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    m: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    e: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    c: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
    n: {
      usanOne: 0,
      usanTwo: 0,
      yangsanOne: 0,
      yangsanTwo: 0,
    },
  })
  // const [choose, setChoose] = useState(false)
  const languages = useSelectors((state) => state.languages.value)
  const selection = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const onLine = useSelectors((state) => state.onLine.value)
  const [calledMap, setCalledMap] = useState(null)
  const [markings, setMarkings] = useState([])
  const [markersList, setMarkersList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedValueTwo = searchParams.get('selectedValueTwo')
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  useEffect(() => {
    const bringMessages = async () => {
      // let order = 'asc'

      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock'),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      const itemCount = {
        cl: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        cw: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        p: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        g: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        k: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        m: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        e: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        c: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
        n: {
          usanOne: 0,
          usanTwo: 0,
          yangsanOne: 0,
          yangsanTwo: 0,
        },
      }
      // let usanOneCount = 0
      // let usanTwoCount = 0
      // let yangsanOneCount = 0
      // let yangsanTwoCount = 0
      docs.forEach((doc) => {
        newArray.push(doc.data())
        if (doc.data().item === '우산') {
          const key = Object.keys(locationsCollectionLetters).find(
            (key) => locationsCollectionLetters[key] === doc.data().text.count,
          )
          if (doc.data().text.choose === 1) {
            if (key) {
              itemCount[key].usanOne += 1
            }
          } else if (doc.data().text.choose === 2) {
            if (key) {
              itemCount[key].usanTwo += 1
            }
          }
        } else if (doc.data().item === '양산') {
          if (doc.data().text.choose === 1) {
            if (key) {
              itemCount[key].yangsanOne += 1
            }
          } else if (doc.data().text.choose === 2) {
            if (key) {
              itemCount[key].yangsanTwo += 1
            }
          }
        }
        // if (doc.data().text.count === selectedValues[1].value) {
        // }
        // console.log(doc.data())
      })
      // setMessages(newArray)
      setItems(itemCount)
    }
    bringMessages()
  }, [selectedValues[1].value])
  console.log(items)
  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: 'selectedValueTwo', newValue: newValue.ko })
    // setSelectedLocation(newValue.en)
  }
  // const onClickMarkerItem = (newValue) => {
  //   handleSelectedValues({ id: 'selectedValueOne', newValue: newValue })
  // }

  // const markersCollection = []
  // const infoWindows = []
  const mapRef = useRef(null)
  // const { naver } = window
  // let location
  // let map
  // if (mapRef.current && naver) {
  //   location = new naver.maps.LatLng(defaultLocation.lat, defaultLocation.lng)
  //   map = new naver.maps.Map(mapRef.current, {
  //     center: location,
  //     zoom: 17,
  //   })
  // }
  const displayMap = () => {
    const { naver } = window
    // const contentString = [
    //   '<div class="iw_inner">',
    //   '   practice',
    //   '</div>',
    // ].join('')

    // const infowindow = new naver.maps.InfoWindow({
    //   content: contentString,
    //   backgroundColor: '#777',
    // })
    if (mapRef.current && naver) {
      const markersCollection = []
      const infoWindows = []
      const location = new naver.maps.LatLng(
        defaultLocation.lat,
        defaultLocation.lng,
      )
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      })
      setCalledMap(map)
      for (const value of markers) {
        const position = new naver.maps.LatLng(
          value.location.lat,
          value.location.lng,
        )

        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          title: value.label,
          id: value.label.ko,
        })
        // console.log(marker)
        const key = Object.keys(locationsCollectionLetters).find(
          (key) => locationsCollectionLetters[key] === value.label.ko,
        )
        const contentString = [
          `<div class="markerContainer">
            <div class="markerTitle">
              ${languages === 'ko' ? value.label.ko : value.label.en}
            </div>
            <div key={index} className="flex gap-5">
                <div className="pt-1">
                  ${selectItems[0][selection]}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌리기: ' : 'Borrowing: '}
                  ${items[key].usanOne}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌려주기: ' : 'Lending: '}
                  ${items[key].usanTwo}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-1">
                  ${selectItems[1][selection]}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌리기: ' : 'Borrowing: '}
                  ${items[key].yangsanOne}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌려주기: ' : 'Lending: '}
                  ${items[key].yangsanTwo}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
              </div>
          </div>`,
        ].join('')
        const infoWindow = new naver.maps.InfoWindow({
          id: value.label.ko,
          content: contentString,
          // <div className="flex flex-col text-black">
          //   <div className="flex justify-center">
          //     {languages === 'ko'
          //       ? selectedValues[1].value
          //       : selectedLocation}
          //   </div>
          //   {selectItems.map((value, index) => {
          //     return (
          //       <div className="flex gap-5">
          //         <div className="pt-1">
          //           <Chip
          //             label={`${selectItems[index][selection]}`}
          //             onClick={() => {
          //               setChoose(true)
          //               onClickMarkerItem(
          //                 `${selectItems[index].ko}`,
          //               )
          //             }}
          //           />
          //         </div>
          //         <div className="pt-3">
          //           {languages === 'ko' ? '빌리기' : 'Borrowing'}:{' '}
          //           {index ? items.yangsanOne : items.usanOne}{' '}
          //           {languages === 'ko' ? '요청' : 'requests'}
          //         </div>
          //         <div className="pt-3">
          //           {languages === 'ko' ? '빌려주기' : 'Lending'}:{' '}
          //           {index ? items.yangsanTwo : items.usanTwo}{' '}
          //           {languages === 'ko' ? '요청' : 'requests'}
          //         </div>
          //       </div>
          //     )
          //   })}
          // </div>
          // '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          // String(index) +
          // '"</b>.</div>',
          backgroundColor: '#777',
          anchorColor: '#777',
        })
        // console.log(marker.id)
        // console.log(location)
        if (marker.id === selectedValueTwo) {
          infoWindow.open(map, marker)
        }
        markersCollection.push(marker)
        infoWindows.push(infoWindow)
        setMarkersList(markersCollection)
        setMarkings(infoWindows)
      }
      function getClickHandler(seq) {
        const marker = markersCollection[seq]
        const infoWindow = infoWindows[seq]

        if (infoWindow.getMap()) {
          infoWindow.close()
          onClickMarker({ ko: '전체 장소' })
        } else {
          infoWindow.open(map, marker)
          onClickMarker(markers[seq].label)
        }
      }
      for (let number = 0, length = markers.length; number < length; number++) {
        naver.maps.Event.addListener(markersCollection[number], 'click', () => {
          getClickHandler(number)
          // if (onMarker) {
          //   onMarkerFalse()
          //   onClickMarker({ ko: '전체 장소' })
          // } else {
          //   onMarkerTrue()
          //   onClickMarker(markers[number].label)
          // }
        })
      }
    }
  }
<<<<<<< HEAD

  const mapRef = useRef(null)
  const displayMap = () => {
    const { naver } = window
    // const contentString = [
    //   '<div class="iw_inner">',
    //   '   practice',
    //   '</div>',
    // ].join('')

    // const infowindow = new naver.maps.InfoWindow({
    //   content: contentString,
    //   backgroundColor: '#777',
    // })
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(
        defaultLocation.lat,
        defaultLocation.lng,
      )
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      })
      const markersCollection = []
      const infoWindows = []

      for (const index in markers) {
        const position = new naver.maps.LatLng(
          markers[index].location.lat,
          markers[index].location.lng,
        )

        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          title: index,
        })
        const contentString = [
          `<div class="markerContainer">
            <div class="markerTitle">
              ${languages === 'ko' ? markers[index].label.ko : markers[index].label.en}
            </div>
            <div key={index} className="flex gap-5">
                <div className="pt-1">
                  ${selectItems[0][selection]}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌리기: ' : 'Borrowing: '}
                  ${items.usanOne}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌려주기: ' : 'Lending: '}
                  ${items.usanTwo}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-1">
                  ${selectItems[1][selection]}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌리기: ' : 'Borrowing: '}
                  ${items.yangsanOne}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
                <div className="pt-3">
                  ${languages === 'ko' ? '빌려주기: ' : 'Lending: '}
                  ${items.yangsanTwo}
                  ${languages === 'ko' ? ' 요청' : ' requests'}
                </div>
              </div>
          </div>`,
        ].join('')
        const infoWindow = new naver.maps.InfoWindow({
          content: contentString,
          // <div className="flex flex-col text-black">
          //   <div className="flex justify-center">
          //     {languages === 'ko'
          //       ? selectedValues[1].value
          //       : selectedLocation}
          //   </div>
          //   {selectItems.map((value, index) => {
          //     return (
          //       <div className="flex gap-5">
          //         <div className="pt-1">
          //           <Chip
          //             label={`${selectItems[index][selection]}`}
          //             onClick={() => {
          //               setChoose(true)
          //               onClickMarkerItem(
          //                 `${selectItems[index].ko}`,
          //               )
          //             }}
          //           />
          //         </div>
          //         <div className="pt-3">
          //           {languages === 'ko' ? '빌리기' : 'Borrowing'}:{' '}
          //           {index ? items.yangsanOne : items.usanOne}{' '}
          //           {languages === 'ko' ? '요청' : 'requests'}
          //         </div>
          //         <div className="pt-3">
          //           {languages === 'ko' ? '빌려주기' : 'Lending'}:{' '}
          //           {index ? items.yangsanTwo : items.usanTwo}{' '}
          //           {languages === 'ko' ? '요청' : 'requests'}
          //         </div>
          //       </div>
          //     )
          //   })}
          // </div>
          // '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          // String(index) +
          // '"</b>.</div>',
          backgroundColor: '#777',
          anchorColor: '#777',
        })

        markersCollection.push(marker)
        infoWindows.push(infoWindow)
      }
      function getClickHandler(seq) {
        const marker = markersCollection[seq]
        const infoWindow = infoWindows[seq]

        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      }
      for (let number = 0, length = markers.length; number < length; number++) {
        naver.maps.Event.addListener(markersCollection[number], 'click', () => {
          getClickHandler(number)
          onClickMarker(markers[number].label)
        })
      }
    }
  }
=======
  useEffect(() => {
    if (selectedValueTwo && markings.length && calledMap) {
      const index = markings.findIndex((value) => value.id === selectedValueTwo)
      if (index > -1) {
        markings[index]?.open(calledMap, markersList[index])
      }
    }
    if (!selectedValueTwo) {
      markings.forEach((value) => {
        value.close()
      })
    }
  }, [selectedValueTwo])
>>>>>>> main
  return (
    <div>
      <div
        onClick={() => {
          const value = document.getElementById('Cheongwoon')
          console.log(value)
          value?.click()
        }}
      >
        practice
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={() => {
              // document.getElementById('boardMap')?.click()
              // console.log(document.getElementsByClassName('dismissButton'))
              // setTimeout(
              //   () =>
              //     document.getElementsByClassName('dismissButton')[0]?.click(),
              //   500,
              // )
              // setTimeout(
              //   () =>
              //     document.getElementsByClassName('dismissButton')[0]?.click(),
              //   1500,
              // )
              // displayMap()
              setTimeout(displayMap, 10)
            }}
            className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
          >
            <div className="flex gap-5">
              <MapIcon />
              <div>{registeredMap[selection]}</div>
            </div>
            {/* <AccordionTrigger
              id="boardMap"
              onClick={() => setTimeout(displayMap, 10)}
            ></AccordionTrigger> */}
          </AccordionTrigger>
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
                <>
                  {/* <Map
                    mapId={import.meta.env.VITE_MAPID}
                    defaultCenter={defaultLocation}
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
                                    onClickMarkerItem(
                                      `${selectItems[index].ko}`,
                                    )
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
                  </Map> */}
                  <div
                    ref={mapRef}
                    style={{ width: '100%', height: '500px' }}
                  ></div>
                </>
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
