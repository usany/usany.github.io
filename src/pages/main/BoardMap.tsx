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
    useEffect(() => {
        loader
        .importLibrary('maps')
        .then(({Map}) => {
            new Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        })
        .catch((error) => {
            console.log(error)
        });
    })
      
    return (  
        <div>
            <Accordion
                type='single'
                collapsible
                className='px-3'
            >
                <AccordionItem value='item-1'>
                    <AccordionTrigger 
                    >등록 지도</AccordionTrigger>
                    <AccordionContent>
                        <div id="map">samples</div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default BoardMap
