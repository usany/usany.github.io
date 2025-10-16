import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { MapIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import FilterDialogsTrigger from '../FilterDialogs/FilterDialogsTrigger'
import { locationsCollectionLetters, markers } from 'src/pages/add/locationsBuildings'

interface Props {
  selectedValues: object
  handleSelectedValues: (newValue: {
    id: string
    newValue: string
  }) => void
}

const defaultLocation = markers[0].location
function BoardMap({
  selectedValues,
  handleSelectedValues,
}: Props) {
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
  const languages = useSelectors((state) => state.languages.value)
  const [searchParams, setSearchParams] = useSearchParams()
  const onLine = useSelectors((state) => state.onLine.value)
  const [calledMap, setCalledMap] = useState(null)
  const [markings, setMarkings] = useState([])
  const [markersList, setMarkersList] = useState([])
  const [onAccordion, setOnAccordion] = useState(false)
  const selectedValueTwo = searchParams.get('selectedValueTwo')
  const theme = useSelectors((state) => state.theme.value)
  const { borrowing, lending, needNetworkConnection, registeredMap, registeredMapExplanation, itemOne, itemTwo } = useTexts()
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  useEffect(() => {
    const bringMessages = async () => {
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
      })
      setItems(itemCount)
    }
    bringMessages()
  }, [selectedValues[1].value])
  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: 'selectedValueTwo', newValue: newValue.ko })
  }
  const mapRef = useRef(null)
  const displayMap = () => {
    const { naver } = window
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
      console.log(markers)
      console.log(locationsCollectionLetters)
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
        const key = Object.keys(locationsCollectionLetters).find(
          (key) => locationsCollectionLetters[key] === value.label.ko.name,
        )
        const contentString = [
          `<div class="markerContainer">
            <div class="markerTitle">
              ${languages === 'ko' ? value.label.ko.name : value.label.en.name}
            </div>
            <div key={index} className="flex gap-5">
                <div className="pt-1">
                  ${itemOne}
                </div>
                <div className="pt-3">
                  ${borrowing}
                  ${items[key].usanOne}
                </div>
                <div className="pt-3">
                  ${lending}
                  ${items[key].usanTwo}
                </div>
                <div className="pt-1">
                  ${itemTwo}
                </div>
                <div className="pt-3">
                  ${borrowing}
                  ${items[key].yangsanOne}
                </div>
                <div className="pt-3">
                  ${lending}
                  ${items[key].yangsanTwo}
                </div>
              </div>
          </div>`,
        ].join('')
        const infoWindow = new naver.maps.InfoWindow({
          id: value.label.ko,
          content: contentString,
          backgroundColor: theme === 'light' ? '#fff' : '#777',
          anchorColor: theme === 'light' ? '#fff' : '#777',
          borderColor: theme !== 'light' ? '#fff' : '#777',
        })
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
        })
      }
    }
  }
  useEffect(() => {
    if (onAccordion) {
      displayMap()
    }
  }, [languages, theme, onAccordion])
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
  return (
    <div className="w-[1000px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={() => {
              setOnAccordion(!onAccordion)
            }}
            className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
          >
            <div className="flex gap-5">
              <MapIcon />
              <div>{registeredMap}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {selectedValues[1].value === '전체 장소' ? (
              <div className="flex p-5">
                {onLine && registeredMapExplanation}
              </div>
            ) : (
              <div className="flex p-5">
                <FilterDialogsTrigger />
              </div>
            )}
            {onLine ? (
              <div
                ref={mapRef}
                className='w-full h-[300px]'
              ></div>
            ) : (
              <div className="flex justify-center">
                {needNetworkConnection}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default BoardMap
