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

function BoardMap() {
    const [mapAccordion, setMapAccordion] = useState(false)
    const loader = new Loader({
        apiKey: import.meta.env.VITE_MAPS_PLATFORM,
        version: "weekly",
    });
    const tourStops = [
        {
          position: { lat: 34.8791806, lng: -111.8265049 },
          title: "Boynton Pass",
        },
        {
          position: { lat: 34.8559195, lng: -111.7988186 },
          title: "Airport Mesa",
        },
        {
          position: { lat: 34.832149, lng: -111.7695277 },
          title: "Chapel of the Holy Cross",
        },
        {
          position: { lat: 34.823736, lng: -111.8001857 },
          title: "Red Rock Crossing",
        },
        {
          position: { lat: 34.800326, lng: -111.7665047 },
          title: "Bell Rock",
        },
    ];
    useEffect(() => {
        if (mapAccordion) {
            loader
            .importLibrary('maps')
            .then(({Map, InfoWindow}) => {
                const map = new Map(document.getElementById('map'), {
                    center: { lat: 34.84555, lng: -111.8035 },
                    zoom: 10,
                    mapId: '77db85c9c2270baa'
                });
                const infoWindow = new InfoWindow();

                loader
                .importLibrary('marker')
                .then(({AdvancedMarkerElement, PinElement}) => {
                    tourStops.forEach(({ position, title }, i) => {
                        const pin = new PinElement({
                          glyph: `${i + 1}`,
                          scale: 1,
                          background: '#FBBC04',
                          borderColor: '#137333',
                          glyphColor: '#ffffff'
                        });
                        const marker = new AdvancedMarkerElement({
                          position,
                          map,
                          title: `${i + 1}. ${title}`,
                          content: pin.element,
                          gmpClickable: true,
                        });
                        marker.addListener('click', () => {
                            infoWindow.close();
                            infoWindow.setContent(marker.title);
                            infoWindow.open(marker.map, marker);
                        });
                    })
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
                        <div id="map" className='w-full h-[300px]'>samples</div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default BoardMap
