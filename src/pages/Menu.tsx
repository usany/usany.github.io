import { useState, useEffect, useRef } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import { getToken } from "firebase/messaging";
import MessageStacks from 'src/muiComponents/MessageStacks'
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import PageTitle from 'src/muiComponents/PageTitle'
// import { useCardAccordionStore, useMessageAccordionStore, usePiazzaSwitchStore, useThemeStore } from 'src/store'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useSelector, useDispatch } from 'react-redux'
import { change } from 'src/stateSlices/cardAccordionSlice'
import { changeMessageAccordion } from 'src/stateSlices/messageAccordionSlice'
import Skeleton from '@mui/material/Skeleton';
import { User } from 'firebase/auth';
    
interface Props {
    userObj: User | null
}
function Menu({ userObj }: Props) {
    const [messages, setMessages] = useState<Array<object>>([]);
    const piazzaSwitch = useSelector(state => state.piazzaSwitch.value)
    const cardAccordion = useSelector(state => state.cardAccordion.value)
    const messageAccordion = useSelector(state => state.messageAccordion.value)
    const dispatch = useDispatch()
    const [cardLoaded, setCardLoaded] = useState(false)
    const [accordions, setAccordions] = useState({cards: '', messages: '' })
    useEffect(() => {
        if (cardAccordion && messageAccordion) {
            setAccordions({cards: 'item-1', messages: 'item-2'})
        } else if (cardAccordion && !messageAccordion) {
            setAccordions({cards: 'item-1', messages: ''})
        } else if (!cardAccordion && messageAccordion) {
            setAccordions({cards: '', messages: 'item-2'})
        } else {
            setAccordions({cards: '', messages: ''})
        }
    }, [cardAccordion, messageAccordion])
    useEffect(() => {
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE' });
                if (token) {
                    console.log('Token generated:', token);
                    // Send this token to your server to store it for later use
                    // webSocket.on('messagingToken', token)
                    // return (
                    //     webSocket.off('messagingToken', token)
                    // )
                    const myDoc = doc(dbservice, `members/${userObj.uid}`)
                    updateDoc(myDoc, {messagingToken: token});
                } else {
                    console.log('No registration token available.');
                }
            } catch (err) {
                console.error('Error getting token:', err);
            }
        };
        requestPermission();
    }, []);
    
    useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => {
            if (document.data().creatorId === userObj.uid) {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            } else if (document.data().connectedId === userObj.uid && document.data().round !== 1) {
                return ({
                    id: document.id,
                    ...document.data(),
                })
            }
        });
        const newArraySelection = newArray.filter((element) => {
            return element !== undefined;
        });
        setMessages(newArraySelection)
        setCardLoaded(true)
    })
    }, [])
    
    return (
        <div className='flex justify-center flex-col pb-5'>
            <PageTitle title={'내 상태'}/>
            <Accordion 
                value={[accordions.cards, accordions.messages]}
                type="multiple" className="w-full px-3">
                <AccordionItem value="item-1">
                <AccordionTrigger onClick={() => dispatch(change())}>카드</AccordionTrigger>
                <AccordionContent >
                    {cardLoaded ? 
                        <div>
                            {!messages.length ? 
                                <div className='flex justify-center pt-20'>진행 카드가 없습니다</div> :
                                <div className='flex flex-wrap'>
                                    {messages.map((msg) => {
                                        if(msg.round !== 5) {
                                            if (msg.creatorId === userObj.uid) {
                                                return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} />)
                                            } else if (msg.connectedId === userObj.uid && msg.round !== 1) {
                                                return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} />)
                                            }
                                        }
                                    })}
                                </div>
                            }
                        </div>:
                        <Skeleton />
                    }
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger onClick={() => dispatch(changeMessageAccordion())}>메세지</AccordionTrigger>
                <AccordionContent>
                    {!piazzaSwitch ? <div className='flex justify-center pt-20'>받은 메세지가 없습니다</div> :
                        <div className='flex flex-col justify-center'>
                            {piazzaSwitch && 
                                <MessageStacks />
                            }
                            <ChattingStacks userObj={userObj}
                        />
                        </div>
                    }
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        </div>  
    )
}

export default Menu
