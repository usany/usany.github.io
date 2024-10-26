import { useState, useEffect, useRef } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import { getToken } from "firebase/messaging";
import { io } from "socket.io-client";
import { webSocket, onClick } from 'src/webSocket.tsx'
import MessageStacks from 'src/muiComponents/MessageStacks'
import ChattingStacks from 'src/muiComponents/ChattingStacks'

// 2
// const webSocket = io("https://service-ceni.onrender.com");
// const webSocket = io("http://localhost:5000");

// let tmpCounter = []
function Menu({ isLoggedIn, userObj, counter, setCounter, setValue, tmpCounter, piazzaSwitch, newMessage, setNewMessage }) {
    // const [choose, setChoose] = useState(true);
    const [messages, setMessages] = useState<Array<object>>([]);
    // const [userId, setUserId] = useState("");
    // const [isLogin, setIsLogin] = useState(false);
    // const [msg, setMsg] = useState("");
    // const [msgList, setMsgList] = useState([]);
    // const [privateTarget, setPrivateTarget] = useState('');
    // const [roomNumber, setRoomNumber] = useState(1);
    // const [button, setButton] = useState(false)
    const [chats, setChats] = useState(false)
    const [piazzaOn, setPiazzaOn] = useState('')
    // const [piazzaMessages, setPiazzaMessages] = useState([])
    const [newMessages, setNewMessages] = useState(0)
    useEffect(() => {
        setPiazzaOn(piazzaSwitch.current)
        // if (piazzaSwitch.current !== piazzaOn) {
        // }
    }, [])
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
    })
    }, [])

    const onCounting = (msg) => {
        // setCounter([
        //     ...counter,
        //     msg.id
        // ])
        tmpCounter.push(msg.id)
    }
    
    // const onClick = () => {
    //     setChoose(true)
    // }

    useEffect(() => {
        setCounter(tmpCounter)
    })

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

    return (
        <div className='flex justify-center flex-col pb-5'>
            {/* <div className='flex justify-center border border-sky-500'>
                내 상태
            </div> */}
            <div className='flex justify-start text-2xl p-5'>
                내 상태
            </div>
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
                                            if (counter.indexOf(msg.id) === -1) {
                                                onCounting(msg)
                                            }
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} setValue={setValue} />)
                                        }
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        {/* <div className='flex justify-center'>받은 메세지</div> */}
                            <div>
                                {!chats && !piazzaOn ? <div className='flex justify-center pt-20'>받은 메세지가 없습니다</div> :
                                <div className='flex flex-col justify-center'>
                                    <div className='flex justify-center'>받은 메세지</div>
                                    {piazzaOn === 'true' && 
                                        <MessageStacks />
                                    }
                                    <ChattingStacks userObj={userObj} newMessage={newMessage} setNewMessage={setNewMessage} newMessages={newMessages} setNewMessages={setNewMessages} setChats={setChats}/>
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
