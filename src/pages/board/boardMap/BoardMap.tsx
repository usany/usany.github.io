import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chip } from "@mui/material";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  Pin
} from "@vis.gl/react-google-maps";
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  dbservice
} from "src/baseApi/serverbase";
import FilterDialogs from "src/pages/board/FilterDialogs/FilterDialogs";
import { useImmer } from "use-immer";

interface Props {
  onMarker: boolean;
  onMarkerTrue: () => void;
  onMarkerFalse: () => void;
}
const area = [
  {
    westSouth: {lat: 37.5927551, lng: 127.047462},
    westNorth: {lat: 37.6010743, lng: 127.047462},
    eastSouth: {lat: 37.5927551, lng: 127.0571999},
    eastNorth: {lat: 37.6010743, lng: 127.0571999},
  }
]

const markers = [
  {
    label: '중도',
    location: { lat: 37.5970966, lng: 127.0527314 }
  },
  {
    label: '네오르네상스관',
    location: { lat: 37.5948201, lng: 127.053091 }
  },
  {
    label: '푸른솔',
    location: { lat: 37.5941125, lng: 127.0557743 }
  },
  {
    label: '간호이과대',
    location: { lat: 37.5960528, lng: 127.0536951 }
  },
  {
    label: '문과대',
    location: { lat: 37.5971991, lng: 127.0539612 }
  },
  {
    label: '청운',
    location: { lat: 37.594732, lng: 127.0517775 }
  },
  {
    label: '의과대',
    location: { lat: 37.59390, lng: 127.0549 }
  },
  {
    label: '경영대',
    location: { lat: 37.5967052, lng: 127.0552861 }
  },
  {
    label: '치과병원',
    location: { lat: 37.594054, lng: 127.0531189 }
  },
]
const defaultLocation = markers[0].location
function BoardMap({ mapAccordion, mapAccordionToggle, onMarker, onMarkerTrue, onMarkerFalse, selectedValues, handleSelectedValues }: Props) {
  const [messages, setMessages] = useState<Array<object>>([]);
  // const [mapAccordion, setMapAccordion] = useState(false);
  const [choose, setChoose] = useState(false);


  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  useEffect(() => {
    if (selectedValues[2].value === "최신순" || !selectedValues[2].value) {
      onSnapshot(
        query(collection(dbservice, "num"), orderBy("creatorClock", "desc")),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            };
          });
          setMessages(newArray);
        }
      );
    } else {
      onSnapshot(
        query(collection(dbservice, "num"), orderBy("creatorClock")),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            };
          });
          setMessages(newArray);
        }
      );
    }
  }, [selectedValues[2].value]);

  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: "selectedValueTwo", newValue: newValue });
  };
  const onClickMarkerItem = (newValue) => {
    handleSelectedValues({ id: "selectedValueOne", newValue: newValue });
  };
  return (
    <div>
      <Accordion type="single" collapsible className="px-3">
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => mapAccordionToggle()}>
            등록 지도
          </AccordionTrigger>
          {/* <div className="sticky top-10 z-30 bg-light-3 dark:bg-dark-3"></div> */}
          <AccordionContent>
            <div>
              {/* <div className="p-5">
                59.9156636,10.7507967 표시된 곳을 선택하면 해당하는 내용만
                확인할 수 있어요
              </div> */}
              {selectedValues[1].value === '전체 장소' ?
                <div className="flex p-5">
                  표시된 곳을 선택하면 해당하는 내용만
                  확인할 수 있어요
                </div>
                :
                <div className='flex p-5'>
                  <FilterDialogs
                    selectedValues={selectedValues}
                    handleSelectedValues={handleSelectedValues}
                  />
                </div>
              }
              {/* {mapAccordion && onMarker && (
                <div className='flex justify-end'>
                  <FilterDialogs
                    selectedValues={selectedValues}
                    handleSelectedValues={handleSelectedValues}
                  />
                </div>
              )} */}
            </div>
            <div className="w-full h-[300px]">
              <Map
                mapId={'77db85c9c2270baa'}
                defaultCenter={defaultLocation}
                // defaultCenter={{ lat: 37.5968367, lng: 127.0518435 }}
                defaultZoom={17}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                {markers.map((value, index) => {
                  return (
                    <AdvancedMarker
                      onClick={() => {
                        onClickMarker(value.label);
                        onMarkerTrue();
                      }}
                      position={value.location}
                    >
                      <Pin
                        background={"#0f9d58"}
                        borderColor={"#006425"}
                        glyphColor={"#60d98f"}
                      />
                    </AdvancedMarker>
                  )
                })}
                {/* <AdvancedMarker
                  onClick={() => {
                    onClickMarker("중도");
                    onMarkerTrue();
                  }}
                  position={{ lat: 59.9156636, lng: 10.7507967 }}
                >
                  <Pin
                    background={"#0f9d58"}
                    borderColor={"#006425"}
                    glyphColor={"#60d98f"}
                  />
                </AdvancedMarker> */}
                {/* <Marker
                  onClick={() => {
                    onClickMarker("문과대학");
                    onMarkerTrue();
                  }}
                  position={{ lat: 37.5971991, lng: 127.0539612 }}
                /> */}
                <InfoWindow
                  position={markers.find((element) => element.label === selectedValues[1].value)?.location}
                  onClose={() => {
                    onClickMarker("전체 장소");
                    if (choose) {
                      onClickMarkerItem("전체 아이템");
                      setChoose(false);
                    }
                    onMarkerFalse();
                  }}
                >
                  <div className="flex flex-col">
                    <div className='flex justify-center'>{selectedValues[1].value}</div>
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
                {/* {selectedValues[1].value !== '전체' &&
                } */}
                {/* {selectedValues[1].value === "중도" && (
                  <InfoWindow
                    position={{ lat: 59.9156636, lng: 10.7507967 }}
                    onClose={() => {
                      onClickMarker("전체 장소");
                      if (choose) {
                        onClickMarkerItem("전체 아이템");
                        setChoose(false);
                      }
                      onMarkerFalse();
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
                {selectedValues[1].value === "청운" && (
                  <InfoWindow
                    position={{ lat: 59.9166636, lng: 10.7517967 }}
                    onClose={() => {
                      onClickMarker("전체 장소");
                      if (choose) {
                        onClickMarkerItem("전체 아이템");
                        setChoose(false);
                      }
                      onMarkerFalse();
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
                )} */}
              </Map>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default BoardMap;
