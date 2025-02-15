import { useState, useEffect, lazy } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import FilterDialogs from 'src/pages/main/FilterDialogs'
import { useImmer } from 'use-immer'
import { User } from 'firebase/auth';
import { Chip } from '@mui/material';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {APIProvider, InfoWindow, Map, Marker} from '@vis.gl/react-google-maps';

interface Props {
  onMarker: boolean
  onMarkerTrue: () => void
  onMarkerFalse: () => void
}

function BoardMap({onMarker, onMarkerTrue, onMarkerFalse }: Props) {
    const [messages, setMessages] = useState<Array<object>>([]);
    const [selectedValues, setSelectedValues] = useImmer([
        {
            id: 'selectedValueOne',
            value: '전체'
        },
        {
            id: 'selectedValueTwo',
            value: '전체'
        },
        {
            id: 'selectedValueThree',
            value: '최신순'
        },
    ])
    const [mapAccordion, setMapAccordion] = useState(false)
    const [choose, setChoose] = useState(false);
  
    const handleSelectedValues = ({id, newValue}: {
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
          behavior: "instant", // Optional if you want to skip the scrolling animation
      });
    }, []);

  useEffect(() => {
    if (selectedValues[2].value === '최신순' || !selectedValues[2].value) {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            setMessages(newArray)
        })
    } else {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            setMessages(newArray)
        })
    }
  }, [selectedValues[2].value])
  
  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: "selectedValueTwo", newValue: newValue });
  };
  const onClickMarkerItem = (newValue) => {
    handleSelectedValues({ id: "selectedValueOne", newValue: newValue });
  };
  return (  
    <div>
      <Accordion
        type="single"
        collapsible
        className="px-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => setMapAccordion(!mapAccordion)}>
            등록 지도
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex">
              <div className="p-5">
                59.9156636,10.7507967 표시된 곳을 선택하면 해당하는 내용만
                확인할 수 있어요
              </div>
              {onMarker && (
                <FilterDialogs
                  selectedValues={selectedValues}
                  handleSelectedValues={handleSelectedValues}
                />
              )}
            </div>
            <div className="w-full h-[300px]">
              <Map
                defaultCenter={{ lat: 59.9156636, lng: 10.7507967 }}
                defaultZoom={18}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                <Marker
                  onClick={() => {
                    onClickMarker("중도");
                    onMarkerTrue()
                  }}
                  position={{ lat: 59.9156636, lng: 10.7507967 }}
                />
                <Marker
                  onClick={() => {
                    onClickMarker("청운");
                    onMarkerTrue()
                  }}
                  position={{ lat: 59.9166636, lng: 10.7517967 }}
                />
                {selectedValues[1].value === "중도" && (
                  <InfoWindow
                    position={{ lat: 59.9156636, lng: 10.7507967 }}
                    onClose={() => {
                      onClickMarker("전체 장소");
                      if (choose) {
                        onClickMarkerItem("전체 아이템");
                        setChoose(false);
                      }
                      onMarkerFalse()
                    }}
                  >
                    {/* <button
                      onClick={() => {
                        setChoose(true);
                        onClickMarkerItem("우산");
                      }}
                    >
                      우산:
                    </button> */}
                    <div className="flex flex-col">
                      <div className="flex">
                        <div className="pt-1">
                          <Chip
                            label={`우산`}
                            onClick={() => {
                              setChoose(true);
                              onClickMarkerItem("우산");
                            }}
                          />
                        </div>
                        <div className="pt-3">: {messages.length} 요청</div>
                      </div>
                      <div className="flex">
                        <div className="pt-1">
                          <Chip
                            label={`양산`}
                            onClick={() => {
                              setChoose(true);
                              onClickMarkerItem("양산");
                            }}
                          />
                        </div>
                        <div className="pt-3">: {messages.length} 요청</div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
                {selectedValues[1].value === "청운" && (
                  <InfoWindow
                    position={{ lat: 59.9166636, lng: 10.7517967 }}
                    onClose={() => {
                      onClickMarker("전체 장소");
                      if (choose) {
                        onClickMarkerItem("전체 아이템");
                        setChoose(false);
                      }
                      onMarkerFalse()
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex">
                        <div className="pt-1">
                          <Chip
                            label={`우산`}
                            onClick={() => {
                              setChoose(true);
                              onClickMarkerItem("우산");
                            }}
                          />
                        </div>
                        <div className="pt-3">: {messages.length} 요청</div>
                      </div>
                      <div className="flex">
                        <div className="pt-1">
                          <Chip
                            label={`양산`}
                            onClick={() => {
                              setChoose(true);
                              onClickMarkerItem("양산");
                            }}
                          />
                        </div>
                        <div className="pt-3">: {messages.length} 요청</div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
                {/* <Marker
                  onClick={() => {
                    onClickMarker("청운");
                  }}
                  position={{ lat: 59.9166636, lng: 10.7517967 }}
                /> */}
              </Map>
            </div>
            {/* <div id="map" className='h-[500px]'>samples</div>
                    <div id='el' onClick={() => console.log('practice')}>sample</div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default BoardMap
