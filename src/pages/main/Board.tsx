import { useState, useEffect, lazy } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import FilterDialogs from 'src/pages/main/FilterDialogs'
import { useImmer } from 'use-immer'
import { User } from 'firebase/auth';
import Cards from 'src/components/card/Cards';
import { Chip } from '@mui/material';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import BoardMap from 'src/pages/main/BoardMap';

interface Props {
    userObj: User | null
    borrow: boolean
}
interface Message {
    creatorId: string
    text: {
        choose: number
        count: string
        counter: string
    }
    round: number
    item: string
}
function Notice({ userObj, borrow }: Props) {
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
    const [onMarker, setOnMarker] = useState(false)
    const onMarkerTrue = () => setOnMarker(true)
    const onMarkerFalse = () => setOnMarker(false)
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
        if (mapAccordion) {
            // const map = new maplibregl.Map({
            //     container: 'map',
            //     style:
            //         'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
            //     center: [12.550343, 55.665957],
            //     zoom: 8
            // });
            // const el = document.getElementById('el')
            // const marker = new maplibregl.Marker({element: el})
            //     .setLngLat([12.550343, 55.665957])
            //     .addTo(map);
            // marker.getElement().addEventListener
            // const geojson = {
            //     'type': 'FeatureCollection',
            //     'features': [
            //         {
            //             'type': 'Feature',
            //             'properties': {
            //                 'message': 'Foo',
            //                 'iconSize': [60, 60]
            //             },
            //             'geometry': {
            //                 'type': 'Point',
            //                 'coordinates': [-66.324462890625, -16.024695711685304]
            //             }
            //         },
            //         {
            //             'type': 'Feature',
            //             'properties': {
            //                 'message': 'Bar',
            //                 'iconSize': [50, 50]
            //             },
            //             'geometry': {
            //                 'type': 'Point',
            //                 'coordinates': [-61.2158203125, -15.97189158092897]
            //             }
            //         },
            //         {
            //             'type': 'Feature',
            //             'properties': {
            //                 'message': 'Baz',
            //                 'iconSize': [40, 40]
            //             },
            //             'geometry': {
            //                 'type': 'Point',
            //                 'coordinates': [-63.29223632812499, -18.28151823530889]
            //             }
            //         }
            //     ]
            // };
        
            // const map = new maplibregl.Map({
            //     container: 'map',
            //     style:
            //         'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
            //     center: [-65.017, -16.457],
            //     zoom: 5
            // });
            // geojson.features.forEach((marker) => {
            //     const el = document.getElementById('el')
            //     // el.className = 'marker';
            //     el.style.backgroundImage =
            //         `url(https://picsum.photos/${
            //             marker.properties.iconSize.join('/')
            //         }/)`;
            //     el.style.width = `${marker.properties.iconSize[0]}px`;
            //     el.style.height = `${marker.properties.iconSize[1]}px`;
        
            //     el.addEventListener('click', () => {
            //         console.log('practice')
            //     });
        
                // add marker to map
                // new maplibregl.Marker({element: el})
                //     .setLngLat(marker.geometry.coordinates)
                //     .addTo(map);
            // })
        }
    })

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
  
  return (  
    <div>
        <div className='flex justify-between text-2xl'>
            <PageTitle title={`${borrow ? '빌리기' : '빌려주기'} 카드 목록`}/>
            {/* <div className='flex gap-1 pt-5 px-1'>
                {selectedValues[0].value && <Chip label={selectedValues[0].value}/>}
                {selectedValues[1].value && <Chip label={selectedValues[1].value}/>}
                <FilterDialogs 
                    selectedValues={selectedValues} 
                    handleSelectedValues={handleSelectedValues}
                />
            </div> */}
        </div>
        <BoardMap onMarker={onMarker} onMarkerTrue={onMarkerTrue} onMarkerFalse={onMarkerFalse} />
        <div>
            <div className='flex justify-between'>
                <div className='p-3'>카드 목록</div>
                <div className='flex p-3 gap-1'>
                    {/* {selectedValues[0].value && <Chip label={selectedValues[0].value}/>}
                    {selectedValues[1].value && <Chip label={selectedValues[1].value}/>} */}
                    {!onMarker && 
                        <FilterDialogs 
                            selectedValues={selectedValues} 
                            handleSelectedValues={handleSelectedValues}
                        />
                    }
                </div>
            </div>
        <div className='flex flex-wrap justify-between p-3 gap-1'>
            {messages.map((msg) => {
                let choose
                const isOwner = msg?.creatorId === userObj?.uid
                {borrow ? choose = 1 : choose = 2}
                if (msg?.text.choose === choose && msg?.round === 1) {
                    if (selectedValues[0].value === '전체' || selectedValues[0].value === msg?.item || !selectedValues[0].value) {
                        if (selectedValues[1].value === '전체' || selectedValues[1].value === msg?.text.count || !selectedValues[1].value) {
                            return (
                                <Cards msgObj={msg} isOwner={isOwner} userObj={userObj} num={null} points={null} />
                            )
                        }
                    }
                }
            })}
        </div>
        </div>
    </div>
  )
}

export default Notice
