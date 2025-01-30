import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { getToken } from "firebase/messaging";
import { Skeleton } from "@/components/ui/skeleton"
import { User } from 'firebase/auth';
import Cards from 'src/muiComponents/Cards';
import { Chip, ClickAwayListener } from '@mui/material';

interface Props {
    userObj: User
}
function CardsStacks({ userObj }: Props) {
    const [messages, setMessages] = useState([]);
    const [cardLoaded, setCardLoaded] = useState(false)
    const [longPressCard, setLongPressCard] = useState(null)
    const [onLongPress, setOnLongPress] = useState(0)

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
    
    useEffect(() => {
        if (!onLongPress) {
            setLongPressCard(null)
        }
    }, [onLongPress])
    useEffect(() => {
        if (!longPressCard) {
            setOnLongPress(0)
        }
    }, [longPressCard])
    return (
        <div>
            {cardLoaded ? 
                <div>
                    {!messages.length ? 
                        <div className='flex items-center flex-col'>
                            <div className='flex justify-center border border-dashed rounded w-1/2 p-5'>
                                진행 카드가 없습니다
                            </div>
                        </div> 
                        :
                        <ClickAwayListener onClickAway={() => {
                            setOnLongPress(0)
                            setLongPressCard(null)
                        }}>
                        <div className='flex flex-wrap justify-around gap-1'>
                            {messages.map((msg) => {
                                const isOwner = msg.creatorId === userObj.uid
                                if (msg.round !== 5) {
                                    if (msg.creatorId === userObj.uid) {
                                        return (
                                            <div
                                                onMouseDownCapture={() => {
                                                    const longPress = msg.id
                                                    setLongPressCard(longPress)
                                                }}
                                                // onMouseUp={() => {
                                                //   setPressed(true)
                                                // }}
                                                onTouchStartCapture={() => {
                                                    const longPress = msg.id
                                                    setLongPressCard(longPress)
                                                }}
                                            >
                                                <Cards msgObj={msg} isOwner={isOwner} userObj={userObj} num={null} points={null} onLongPress={onLongPress} changeOnLongPress={(newValue) => setOnLongPress(newValue)} longPressCard={longPressCard} changeLongPressCard={(newValue) => setLongPressCard(newValue)}/>
                                            </div>
                                        )
                                    } else if (msg.connectedId === userObj.uid && msg.round !== 1) {
                                        return (
                                            <div
                                                onMouseDownCapture={() => {
                                                    const longPress = msg.id
                                                    setLongPressCard(longPress)
                                                }}
                                                // onMouseUp={() => {
                                                //   setPressed(true)
                                                // }}
                                                onTouchStartCapture={() => {
                                                    const longPress = msg.id
                                                    setLongPressCard(longPress)
                                                }}
                                            >
                                                <ClickAwayListener onClickAway={() => setLongPressCard(null)}>
                                                    <Cards msgObj={msg} isOwner={isOwner} userObj={userObj} num={null} points={null} onLongPress={onLongPress} changeOnLongPress={(newValue) => setOnLongPress(newValue)} longPressCard={longPressCard}/>
                                                </ClickAwayListener>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                        </ClickAwayListener>
                    }
                </div>
                :
                <Skeleton />
            }
        </div>  
    )
}

export default CardsStacks
