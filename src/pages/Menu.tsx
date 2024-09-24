import { useState, useEffect, useRef } from 'react'
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import { getToken } from "firebase/messaging";
import { io } from "socket.io-client";

// 2
const webSocket = io("https://service-ceni.onrender.com");

// let tmpCounter = []
function Menu({ isLoggedIn, userObj, counter, setCounter, setValue, tmpCounter }) {
    // const [choose, setChoose] = useState(true);
    const [messages, setMessages] = useState<Array<object>>([]);
    const [userId, setUserId] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const [privateTarget, setPrivateTarget] = useState('');
    const [roomNumber, setRoomNumber] = useState(1);
    const [button, setButton] = useState(false)
    useEffect(() => {
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE' });
                if (token) {
                    console.log('Token generated:', token);
                    // Send this token to your server to store it for later use
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
    // useEffect(() => {
    //     if (!button) return;
    //     function buttons() {
    //       return ({ name: 'John Doe', age: 30 })
    //     }
        
    //     webSocket.emit("button", buttons);
    //     return () => {
    //       webSocket.emit("button", buttons);
    //     };
    //   }, []);
    // const onClick = () => {
    //     console.log('practice')
    //     webSocket.emit("button", { name: 'John Doe', age: 30 });
    //     setButton(true);
    // }
    
    return (
        <div className='flex justify-center flex-col pb-5'>
            {/* <div className='flex justify-center border border-sky-500'>
                내 상태
            </div> */}
            <div className='flex justify-start text-2xl p-5'>
                내 상태
                {/* <div onClick={onClick}>message</div> */}
            </div>
            <div>
                <div className='flex justify-center'>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        <div className='flex justify-center'>등록 카드</div>
                        <div className='flex justify-center flex-wrap'>
                            {messages.map((msg) => {
                                if(msg.creatorId === userObj.uid) {
                                    if(msg.round !== 5) {
                                        if (counter.indexOf(msg.id) === -1) {
                                            onCounting(msg)
                                        }
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} setValue={setValue} />)
                                    }
                                }
                            })}
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        <div className='flex justify-center'>승낙 카드</div>
                            <div className='flex justify-center flex-wrap'>
                                {messages.map((msg) => {
                                    if(msg.connectedId === userObj.uid) {
                                        if (msg.round !== 5) {
                                            if (counter.indexOf(msg.id) === -1) {
                                                onCounting(msg)
                                            }
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} setValue={setValue} />)
                                        }
                                    }
                                })}
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
