import { User } from 'firebase/auth'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import BoardMap from 'src/pages/board/boardMap/BoardMap'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import { SwipeableViews } from 'src/pages/core/SwipeableViews'
import { useImmer } from 'use-immer'
import locationsBuildings from '../add/locationsBuildings'
import CardsList from '../core/card/CardsList'
import Popups from '../core/Popups'
import BoardList from './BoardList'
import FilterDialogsContent from './FilterDialogs/FilterDialogsContent'
import FilterDialogsTitle from './FilterDialogs/FilterDialogsTitle'
import LayoutBoard from './LayoutBoard'
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";

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

function Board({ userObj }: Props) {
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
  const [onMarker, setOnMarker] = useState(false)
  const [mapAccordion, setMapAccordion] = useState(false)
  const [messageLoaded, setMessageLoaded] = useState(false)
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  const navigate = useNavigate()
  const mapAccordionToggle = () => setMapAccordion(!mapAccordion)
  const onMarkerTrue = () => setOnMarker(true)
  const onMarkerFalse = () => setOnMarker(false)
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
    setSearchParams((searchParams) => {
      if (['전체 아이템', '전체 장소', '최신순'].indexOf(newValue) === -1) {
        searchParams.set(id, newValue)
      } else {
        searchParams.delete(id)
      }
      return searchParams
    })
  }
  const languages = useSelectors((state) => state.languages.value)

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
      setMessageLoaded(true)
    }
    bringMessages()
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
  // useEffect(() => {
  //   selectedSearchParams.map((element, index) => {
  //     if (searchParams.get(element.id)) {
  //       if (options[index].indexOf(element.value) !== -1) {
  //         searchParams.set(element.id, element.value)
  //       }
  //     }
  //   })
  // }, [])
  // const handleMail = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const res = await fetch('http://localhost:5000/mail', {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         title: userObj?.uid,
  //         author: userObj?.displayName
  //       })
  //     })
  //     const jsonData = await res.json()
  //     console.log(jsonData)
  //   } catch (error) {
  //     alert("아이템 작성 실패")
  //     console.log(error)
  //   }
  // }

  const mapRef = useRef(null)
  const latitude = 27.5927551
  const longitude = 117.047462

  useEffect(() => {
    const { naver } = window
    const contentString = [
      '<div class="iw_inner">',
      '   practice',
      '</div>',
    ].join('')

    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
      backgroundColor: '#777',
    })
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(latitude, longitude)
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      })
      const marker = new naver.maps.Marker({
        position: location,
        map,
      })
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close()
        } else {
          infowindow.open(map, marker)
        }
      })
      //       var MARKER_SPRITE_X_OFFSET = 29,
      //     MARKER_SPRITE_Y_OFFSET = 50,
      //     MARKER_SPRITE_POSITION = {
      //         "A0": [0, 0],
      //         "B0": [MARKER_SPRITE_X_OFFSET, 0],
      //         "C0": [MARKER_SPRITE_X_OFFSET*2, 0],
      //         "D0": [MARKER_SPRITE_X_OFFSET*3, 0],
      //         "E0": [MARKER_SPRITE_X_OFFSET*4, 0],
      //         "F0": [MARKER_SPRITE_X_OFFSET*5, 0],
      //         "G0": [MARKER_SPRITE_X_OFFSET*6, 0],
      //         "H0": [MARKER_SPRITE_X_OFFSET*7, 0],
      //         "I0": [MARKER_SPRITE_X_OFFSET*8, 0],

      //         "A1": [0, MARKER_SPRITE_Y_OFFSET],
      //         "B1": [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET],
      //         "C1": [MARKER_SPRITE_X_OFFSET*2, MARKER_SPRITE_Y_OFFSET],
      //         "D1": [MARKER_SPRITE_X_OFFSET*3, MARKER_SPRITE_Y_OFFSET],
      //         "E1": [MARKER_SPRITE_X_OFFSET*4, MARKER_SPRITE_Y_OFFSET],
      //         "F1": [MARKER_SPRITE_X_OFFSET*5, MARKER_SPRITE_Y_OFFSET],
      //         "G1": [MARKER_SPRITE_X_OFFSET*6, MARKER_SPRITE_Y_OFFSET],
      //         "H1": [MARKER_SPRITE_X_OFFSET*7, MARKER_SPRITE_Y_OFFSET],
      //         "I1": [MARKER_SPRITE_X_OFFSET*8, MARKER_SPRITE_Y_OFFSET],

      //         "A2": [0, MARKER_SPRITE_Y_OFFSET*2],
      //         "B2": [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET*2],
      //         "C2": [MARKER_SPRITE_X_OFFSET*2, MARKER_SPRITE_Y_OFFSET*2],
      //         "D2": [MARKER_SPRITE_X_OFFSET*3, MARKER_SPRITE_Y_OFFSET*2],
      //         "E2": [MARKER_SPRITE_X_OFFSET*4, MARKER_SPRITE_Y_OFFSET*2],
      //         "F2": [MARKER_SPRITE_X_OFFSET*5, MARKER_SPRITE_Y_OFFSET*2],
      //         "G2": [MARKER_SPRITE_X_OFFSET*6, MARKER_SPRITE_Y_OFFSET*2],
      //         "H2": [MARKER_SPRITE_X_OFFSET*7, MARKER_SPRITE_Y_OFFSET*2],
      //         "I2": [MARKER_SPRITE_X_OFFSET*8, MARKER_SPRITE_Y_OFFSET*2]
      //     };

      // var map = new naver.maps.Map('map', {
      //     center: new naver.maps.LatLng(37.3595704, 127.105399),
      //     zoom: 10
      // });

      // var bounds = map.getBounds(),
      //     southWest = bounds.getSW(),
      //     northEast = bounds.getNE(),
      //     lngSpan = northEast.lng() - southWest.lng(),
      //     latSpan = northEast.lat() - southWest.lat();

      // var markers = [],
      //     infoWindows = [];

      // for (var key in MARKER_SPRITE_POSITION) {

      //     var position = new naver.maps.LatLng(
      //         southWest.lat() + latSpan * Math.random(),
      //         southWest.lng() + lngSpan * Math.random());

      //     var marker = new naver.maps.Marker({
      //         map: map,
      //         position: position,
      //         title: key,
      //         icon: {
      //             url: HOME_PATH +'/img/example/sp_pins_spot_v3.png',
      //             size: new naver.maps.Size(24, 37),
      //             anchor: new naver.maps.Point(12, 37),
      //             origin: new naver.maps.Point(MARKER_SPRITE_POSITION[key][0], MARKER_SPRITE_POSITION[key][1])
      //         },
      //         zIndex: 100
      //     });

      //     var infoWindow = new naver.maps.InfoWindow({
      //         content: '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"'+ key.substr(0, 1) +'"</b>.</div>'
      //     });

      //     markers.push(marker);
      //     infoWindows.push(infoWindow);
      // };

      // naver.maps.Event.addListener(map, 'idle', function() {
      //     updateMarkers(map, markers);
      // });

      // function updateMarkers(map, markers) {

      //     var mapBounds = map.getBounds();
      //     var marker, position;

      //     for (var i = 0; i < markers.length; i++) {

      //         marker = markers[i]
      //         position = marker.getPosition();

      //         if (mapBounds.hasLatLng(position)) {
      //             showMarker(map, marker);
      //         } else {
      //             hideMarker(map, marker);
      //         }
      //     }
      // }

      // function showMarker(map, marker) {

      //     if (marker.setMap()) return;
      //     marker.setMap(map);
      // }

      // function hideMarker(map, marker) {

      //     if (!marker.setMap()) return;
      //     marker.setMap(null);
      // }

      // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
      // function getClickHandler(seq) {
      //     return function(e) {
      //         var marker = markers[seq],
      //             infoWindow = infoWindows[seq];

      //         if (infoWindow.getMap()) {
      //             infoWindow.close();
      //         } else {
      //             infoWindow.open(map, marker);
      //         }
      //     }
      // }

      // for (var i=0, ii=markers.length; i<ii; i++) {
      //     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
      // }
    }
  }, [])

  return (
    <div>
      {userObj && userCertificated ? (
        <div>
          {/* <AlarmCheck />
            <AlertCircle />
            <Siren />
            <Presentation />
            <DoorOpen />
            <UserRound />
            <UserCheck />
            <MessagesSquare />
            <Umbrella />
            <TowerControl />
            <Clock />
            <Building />
            <Watch />
            <Pencil />
            <Search />
            <SearchCheck />
            <SearchCode />
            <SearchSlash />
            <Pen />
            <PenBox />
            <PenTool />
            <PenSquare /> */}
          <SwipeableViews>
            <PageTitle
              icon={<Minimize2 />}
              title={
                languages === 'ko' ? '빌리기 카드 목록' : 'Borrowing Card Board'
              }
            />
            <PageTitle
              icon={<Maximize2 />}
              title={
                languages === 'ko' ? '빌려주기 카드 목록' : 'Lending Card Board'
              }
            />
          </SwipeableViews>
          <div className="px-5">
            <div className="flex justify-center">
              <div className="w-[1000px]">
                <BoardMap
                  mapAccordion={mapAccordion}
                  mapAccordionToggle={mapAccordionToggle}
                  onMarker={onMarker}
                  onMarkerTrue={onMarkerTrue}
                  onMarkerFalse={onMarkerFalse}
                  selectedValues={selectedSearchParams}
                  handleSelectedValues={handleSelectedValues}
                />
              </div>
            </div>
          </div>
          <>
            <div className="truncate flex justify-center sticky top-16 z-30 px-5">
              <div className="w-[1000px] shadow-md">
                <Popups
                  trigger={<BoardList selectedValues={selectedSearchParams} />}
                  title={<FilterDialogsTitle />}
                  content={
                    <FilterDialogsContent
                      selectedValues={selectedValues}
                      handleSelectedValues={handleSelectedValues}
                    />
                  }
                />
              </div>
            </div>
            <SwipeableViews>
              {messageLoaded && (
                <>
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
                </>
              )}
            </SwipeableViews>
          </>
        </div>
      ) : (
        <SwipeableViews>
          <LayoutBoard borrow={true} />
          <LayoutBoard borrow={false} />
        </SwipeableViews>
      )}
      <div ref={mapRef} style={{ width: '500px', height: '500px' }}></div>
    </div>
  )
}

export default Board
