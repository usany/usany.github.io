import { useState, useEffect, useRef } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import { getToken } from "firebase/messaging";
import MessageStacks from 'src/muiComponents/MessageStacks'
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import PageTitle from 'src/muiComponents/PageTitle'
import { useCardAccordionStore, useMessageAccordionStore, usePiazzaSwitchStore, useThemeStore } from 'src/store'
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
    const piazzaSwitch = usePiazzaSwitchStore((state) => state.piazzaSwitch)
    // const cardAccordion = useCardAccordionStore((state) => state.cardAccordion)
    // const handleCardAccordion = useCardAccordionStore((state) => state.handleCardAccordion)
    const cardAccordion = useSelector(state => state.cardAccordion.value)
    const messageAccordion = useSelector(state => state.messageAccordion.value)
    const dispatch = useDispatch()
    // const messageAccordion = useMessageAccordionStore((state) => state.messageAccordion)
    // const handleMessageAccordion = useMessageAccordionStore((state) => state.handleMessageAccordion)
    // const [card, setCard] = useState(true);
    // const [message, setMessage] = useState(true);
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
            // return ({
            //     id: document.id,
            //     ...document.data(),
            // })
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
        // console.log(newArraySelection)
        setMessages(newArraySelection)
        setCardLoaded(true)
    })
    }, [])
    console.log(messages)
    return (
        <div className='flex justify-center flex-col pb-5'>
            {/* <div className='flex justify-center border border-sky-500'>
                내 상태
            </div> */}
            {/* <div className='flex justify-start text-2xl p-5'>
                내 상태
            </div> */}
            <PageTitle title={'내 상태'}/>
            <Accordion 
                // defaultValue={[accordions.cards, accordions.messages]}
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
                            {piazzaSwitch === 'true' && 
                                <MessageStacks />
                            }
                            <ChattingStacks userObj={userObj}
                        />
                        </div>
                    }
                </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                </AccordionContent>
                </AccordionItem> */}
            </Accordion>
            {/* <Accordion sx={{backgroundColor: '#cbd5df'}} expanded={cardAccordion} onChange={() => setCard(!card)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => handleCardAccordion()}
                >
                    카드
                </AccordionSummary>
                <AccordionDetails>
                    {cardLoaded ? 
                    <div>
                        {!messages.length ? 
                            <div className='flex justify-center pt-20'>진행 카드가 없습니다</div> :
                            <div className='flex justify-center flex-wrap'>
                                {messages.map((msg) => {
                                    if(msg.round !== 5) {
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} />)
                                    }
                                })}
                            </div>
                        }
                    </div>:
                    <Skeleton />
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{backgroundColor: '#cbd5df'}} expanded={messageAccordion} onChange={() => setMessage(!message)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => handleMessageAccordion()}
                >
                    메세지
                </AccordionSummary>
                <AccordionDetails>
                    <div>    
                        {!piazzaSwitch ? <div className='flex justify-center pt-20'>받은 메세지가 없습니다</div> :
                            <div className='flex flex-col justify-center'>
                                {piazzaSwitch === 'true' && 
                                    <MessageStacks />
                                }
                                <ChattingStacks userObj={userObj}
                            />
                            </div>
                        }
                    </div>
                </AccordionDetails>
            </Accordion> */}
            {/* <div>
                <div className='flex justify-center'>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        <div className='flex justify-center'>진행 카드</div>
                        <div>
                            {!messages.length ? 
                                <div className='flex justify-center pt-20'>진행 카드가 없습니다</div> :
                                <div className='flex justify-center flex-wrap'>
                                    {messages.map((msg) => {
                                        if(msg.round !== 5) {
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} />)
                                        }
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                            <div>
                                {!chats.length && !piazzaSwitch ? <div className='flex justify-center pt-20'>받은 메세지가 없습니다</div> :
                                    <div className='flex flex-col justify-center'>
                                        <div className='flex justify-center'>받은 메세지</div>
                                        {piazzaSwitch === 'true' && 
                                            <MessageStacks />
                                        }
                                        <ChattingStacks userObj={userObj} chats={chats} handleChats={(newState) => setChats(newState)} handleMessageLoaded={(newState) => setMessageLoaded(newState)}/>
                                    </div>
                                }
                            </div>
                    </div>
                </div>
            </div> */}
            {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        </div>  
    )
}

export default Menu
