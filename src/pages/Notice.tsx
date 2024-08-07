import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Message from 'src/pages/Message'

function Notice({ isLoggedIn, userObj, valuing, setValue, counter, setCounter }) {
  const [messages, setMessages] = useState<Array<object>>([]);

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setMessages(newArray)
    })
  }, [])

  return (  
    <div className='p-5'>
        {/* <div className='flex justify-start text-2xl'>
            빌리기 카드 목록
        </div>
        <div className='flex justify-center flex-wrap'>
                {
                    messages.map((msg) => {
                        if (msg.text.choose === 1 && msg.round === 1) {
                            return(
                                <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>
                            )
                        }
                    })
                } */}
        {valuing === 1 &&
            <div className='flex justify-start text-2xl'>
                빌리기 카드 목록
            </div>
        }
        {valuing !== 1 &&
            <div className='flex justify-start text-2xl'>
                빌려주기 카드 목록  
            </div>
        }
        <div className='flex justify-center flex-wrap'>
                {valuing === 1 && messages.map((msg) => {
                    if (msg.text.choose === 1 && msg.round === 1) {
                        return(
                            <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        )
                    }
                })}
                {valuing === 4 && messages.map((msg) => {
                    if (msg.text.choose === 2 && msg.round === 1) {
                        return(
                            <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        )
                    }
                })}
        </div>
    </div>
  )
}

export default Notice
