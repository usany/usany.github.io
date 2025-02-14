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
import { Loader } from "@googlemaps/js-api-loader"

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

function BoardMap({ selectedValueTwo, handleSelectedValues }) {
    const [mapAccordion, setMapAccordion] = useState(false)
    const [onMarker, setOnMarker] = useState(false)
    const [onMarkerItem, setOnMarkerItem] = useState(false)
    const [markers, setMarkers] = useState([])
    const [value, setValue] = useState(null)
    const [choose, setChoose] = useState(0)
    const loader = new Loader({
        apiKey: import.meta.env.VITE_MAPS_PLATFORM,
        version: "weekly",
    });
    const tourStops = [
        {
          position: { lat: 59.9156636, lng: 10.7507967 },
          title: "Boynton Pass",
        },
        {
          position: { lat: 59.9166636, lng: 10.7517967 },
          title: "Airport Mesa",
        },
        // {
        //   position: { lat: 34.832149, lng: -111.7695277 },
        //   title: "Chapel of the Holy Cross",
        // },
        // {
        //   position: { lat: 34.823736, lng: -111.8001857 },
        //   title: "Red Rock Crossing",
        // },
        // {
        //   position: { lat: 34.800326, lng: -111.7665047 },
        //   title: "Bell Rock",
        // },
    ];
    const markersCollection = []
    useEffect(() => {
        if (mapAccordion) {
            loader
            .importLibrary('maps')
            .then(({Map, InfoWindow}) => {
                const map = new Map(document.getElementById('map'), {
                    center: { lat: 59.9156636, lng: 10.7507967 },
                    zoom: 15,
                    mapId: '77db85c9c2270baa'
                });
                const infoWindow = new InfoWindow();
                loader
                .importLibrary('marker')
                .then(({AdvancedMarkerElement, PinElement}) => {
                    tourStops.forEach(({ position, title }, index) => {
                        const pin = new PinElement({
                          glyph: `${index + 1}`,
                          scale: 1,
                          background: '#FBBC04',
                          borderColor: '#137333',
                          glyphColor: '#ffffff'
                        });
                        const marker = new AdvancedMarkerElement({
                          position,
                          map,
                          title: `${index + 1}. ${title}`,
                          content: pin.element,
                          gmpClickable: true,
                        });
                        marker.addListener('click', () => {
                            infoWindow.close();
                            const contentButtons = '<div>'+
                            `<button id="item-1">우산: ${title}</button>`+
                            '<div>&emsp;</div>'+
                            `<button id="item-2">양산: ${title}</button>`+
                            '</div>'
                            infoWindow.setContent(
                                contentButtons
                            );
                            infoWindow.open(marker.map, marker);
                            setOnMarker(true)
                            setValue(infoWindow)
                            if (index === 0) {
                                handleSelectedValues({id: 'selectedValueTwo', newValue: '중도'})
                            } else if (index === 1) {
                                handleSelectedValues({id: 'selectedValueTwo', newValue: '청운'})
                            }
                        });
                        markersCollection.push(marker)
                        // if (selectedValueTwo === '중도' && !index) {
                        //     const contentButtons = '<div>'+
                        //     `<button id="item-1">우산: ${title}</button>`+
                        //     '<div>&emsp;</div>'+
                        //     `<button id="item-2">양산: ${title}</button>`+
                        //     '</div>'
                        //     infoWindow.setContent(
                        //         contentButtons
                        //     );
                        //     infoWindow.open(marker.map, marker);
                        // }
                        // if (selectedValueTwo === '청운' && index) {
                        //     const contentButtons = '<div>'+
                        //     `<button id="item-1">우산: ${title}</button>`+
                        //     '<div>&emsp;</div>'+
                        //     `<button id="item-2">양산: ${title}</button>`+
                        //     '</div>'
                        //     infoWindow.setContent(
                        //         contentButtons
                        //     );
                        //     infoWindow.open(marker.map, marker);
                        // }
                    })
                    setMarkers(markersCollection)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }, [mapAccordion])
    console.log(selectedValueTwo)
    useEffect(() => {
        // if (value) {
        //     value.close()
        // }
        if (onMarker) {
            document.getElementById('item-1')?.addEventListener('click', () => {
                handleSelectedValues({id: 'selectedValueOne', newValue: '우산'})
                setOnMarkerItem(true)
                value.close()
            })
            document.getElementById('item-2')?.addEventListener('click', () => {
                handleSelectedValues({id: 'selectedValueOne', newValue: '양산'})
                setOnMarkerItem(true)
                value.close()

            })
            document.getElementsByClassName('gm-ui-hover-effect')[0]?.addEventListener('click', () => {
                if (onMarkerItem) {
                    handleSelectedValues({id: 'selectedValueOne', newValue: '전체'})
                    setOnMarkerItem(false)
                }
                handleSelectedValues({id: 'selectedValueTwo', newValue: '전체'})
                setOnMarker(false)
            })
        }
    }, [onMarker, onMarkerItem, selectedValueTwo, value])

    useEffect(() => {
        if (value) {
            value.close()
        }
        loader
        .importLibrary('maps')
        .then(({InfoWindow}) => {
            const infoWindow = new InfoWindow();
            if (selectedValueTwo === '중도') {
                infoWindow.close();
                const contentButtons = '<div>'+
                `<button id="item-1">우산: ${tourStops[0].title}</button>`+
                '<div>&emsp;</div>'+
                `<button id="item-2">양산: ${tourStops[0].title}</button>`+
                '</div>'
                infoWindow.setContent(
                    contentButtons
                );
                infoWindow.open(markers[0].map, markers[0]);
                setOnMarker(true)
                setValue(infoWindow)
            }
            if (selectedValueTwo !== '중도') {
                infoWindow.close();
                const contentButtons = '<div>'+
                `<button id="item-1">우산: ${tourStops[1].title}</button>`+
                '<div>&emsp;</div>'+
                `<button id="item-2">양산: ${tourStops[1].title}</button>`+
                '</div>'
                infoWindow.setContent(
                    contentButtons
                );
                infoWindow.open(markers[1].map, markers[1]);
                setOnMarker(true)
                setValue(infoWindow)
            }
        })
    }, [selectedValueTwo])
    console.log(markers)
    return (  
        <div>
            <Accordion
                type='single'
                collapsible
                className='px-3'
            >
                <AccordionItem value='item-1'>
                    <AccordionTrigger 
                        onClick={() => setMapAccordion(!mapAccordion)}
                    >등록 지도</AccordionTrigger>
                    <AccordionContent>
                        <div id="map" className='w-full h-[300px]'>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default BoardMap
