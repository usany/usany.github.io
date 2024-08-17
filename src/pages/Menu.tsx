import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'

// let tmpCounter = []
function Menu({ isLoggedIn, userObj, counter, setCounter, setValue, tmpCounter }) {
    // const [choose, setChoose] = useState(true);
    const [messages, setMessages] = useState<Array<object>>([]);

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
