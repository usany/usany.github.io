import { useState, useEffect, useRef } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import { getToken } from "firebase/messaging";
import MessageStacks from 'src/muiComponents/MessageStacks'
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import { useCardAccordionStore, useMessageAccordionStore, usePiazzaSwitchStore, useThemeStore } from 'src/store'
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Menu({ userObj }) {
    const [messages, setMessages] = useState<Array<object>>([]);
    const [chats, setChats] = useState([])
    // const [piazzaOn, setPiazzaOn] = useState('')
    // const [newMessages, setNewMessages] = useState(0)
    const piazzaSwitch = usePiazzaSwitchStore((state) => state.piazzaSwitch)
    const cardAccordion = useCardAccordionStore((state) => state.cardAccordion)
    const handleCardAccordion = useCardAccordionStore((state) => state.handleCardAccordion)
    const messageAccordion = useMessageAccordionStore((state) => state.messageAccordion)
    const handleMessageAccordion = useMessageAccordionStore((state) => state.handleMessageAccordion)
    // useEffect(() => {
    //     setPiazzaOn(piazzaSwitch.current)
    // }, [])
    const [card, setCard] = useState(true);
    const [message, setMessage] = useState(true);
    const [cardLoaded, setCardLoaded] = useState(false)
    const [messageLoaded, setMessageLoaded] = useState(false)
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
            return ({
                id: document.id,
                ...document.data(),
            })
        });
        setMessages(newArray)
        setCardLoaded(true)
    })
    }, [])
    // console.log(messageLoaded)
    // const onCounting = (msg) => {
    //     tmpCounter.push(msg.id)
    // }
    
    // const onClick = () => {
    //     setChoose(true)
    // }

    // useEffect(() => {
    //     setCounter(tmpCounter)
    // })

    // const onClick = () => {
    //     fetch('http://localhost:5000/api/world', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
            // body: JSON.stringify({ name: 'John Doe', age: 30 })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    //     console.log('practice')
    // }
    // const playlistId = '0g51VswTtsWRTIQToh5oNe';
    const handleMessageLoaded = (newState) => setMessageLoaded(newState)
    console.log(messageLoaded)
    return (
        <div className='flex justify-center flex-col pb-5'>
            {/* <div className='flex justify-center border border-sky-500'>
                내 상태
            </div> */}
            <div className='flex justify-start text-2xl p-5'>
                내 상태
            </div>
            <Accordion sx={{backgroundColor: '#cbd5df'}} expanded={cardAccordion} onChange={() => setCard(!card)}>
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
                    {/* {!messages.length ? 
                        <div className='flex justify-center pt-20'>진행 카드가 없습니다</div> :
                        <div className='flex justify-center flex-wrap'>
                            {messages.map((msg) => {
                                if(msg.round !== 5) {
                                    return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} />)
                                }
                            })}
                        </div>
                    } */}
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
                        {!chats.length && !piazzaSwitch ? <div className='flex justify-center pt-20'>받은 메세지가 없습니다</div> :
                            <div className='flex flex-col justify-center'>
                                {piazzaSwitch === 'true' && 
                                    <MessageStacks />
                                }
                                <ChattingStacks userObj={userObj} chats={chats} handleChats={(newState) => setChats(newState)} handleMessageLoaded={(newState) => setMessageLoaded(newState)}/>
                            </div>
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            <div>
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
            </div>
            {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        </div>  
    )
}

export default Menu
