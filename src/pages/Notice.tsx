import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Message from 'src/pages/Message'
import FilterDialogs from 'src/muiComponents/FilterDialogs'
import Settings from '@mui/icons-material/Settings';

function Notice({ isLoggedIn, userObj, valuing, setValue, counter, setCounter }) {
  const [messages, setMessages] = useState<Array<object>>([]);
  const [changeFilter, setChangeFilter] = useState(false);
  const [selectedValueOne, setSelectedValueOne] = useState(null);
  const [selectedValueTwo, setSelectedValueTwo] = useState(null);
  const [selectedValueThree, setSelectedValueThree] = useState(null);
  const handleClickChangeFilter = () => {
    setChangeFilter(true);
  };

  const handleClose = () => {
    setChangeFilter(false);
  };

  const changeSelectedValueOne = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueOne(value)
  }
  const changeSelectedValueTwo = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueTwo(value)
  }
  const changeSelectedValueThree = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event
    setSelectedValueThree(value)
  }

  useEffect(() => {
    if (selectedValueThree === '최신순' || !selectedValueThree) {
        // onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                // console.log(document.data().text.clocker.gmt)
                // if (document.data().text.clocker.gmt === undefined || document.data().text.clocker.gmt > Date.now()) {
                // }
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            // console.log(newArray)
            setMessages(newArray)
        })
    } else {
        // onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => {
                // console.log(document.data().text.clocker.gmt)
                // if (document.data().text.clocker.gmt === undefined || document.data().text.clocker.gmt > Date.now()) {
                // }
                return ({
                    id: document.id,
                    ...document.data(),
                })
            });
            // console.log(newArray)
            setMessages(newArray)
        })
    }
  }, [selectedValueThree])

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
            <div className='flex justify-start text-2xl w-screen'>
                <div className='flex w-5/6'>빌리기 카드 목록</div>
                <div className='flex w-screen justify-end px-10' onClick={handleClickChangeFilter}>
                    <Settings onClick={handleClickChangeFilter}/>
                </div>
            </div>
        }
        {valuing !== 1 &&
            <div className='flex justify-start text-2xl w-screen'>
                <div className='flex w-5/6'>빌려주기 카드 목록</div>
                <div className='flex w-screen justify-end px-10'>
                    <Settings onClick={handleClickChangeFilter}/>
                </div>
            </div>
        }
        <FilterDialogs changeFilter={changeFilter} handleClose={handleClose} selectedValueOne={selectedValueOne} selectedValueTwo={selectedValueTwo} selectedValueThree={selectedValueThree} setSelectedValue={setSelectedValueOne} setSelectedValueTwo={setSelectedValueTwo} setSelectedValueThree={setSelectedValueThree} changeSelectedValueOne={changeSelectedValueOne} changeSelectedValueTwo={changeSelectedValueTwo} changeSelectedValueThree={changeSelectedValueThree}/>
        <div className='flex justify-center flex-wrap'>
                {valuing === 1 && messages.map((msg) => {
                    // console.log(msg.text.clocker.gmt)
                    if (msg.text.choose === 1 && msg.round === 1 && msg.text.clocker.gmt.seconds*1000 + Date.now()) {
                        if (selectedValueTwo === '전체' || selectedValueTwo === msg.text.count || !selectedValueTwo) {
                            return(
                                <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter} selectedValueOne={selectedValueOne} selectedValueTwo={selectedValueTwo} selectedValueThree={selectedValueThree} />
                            )
                        }
                    }
                })}
                {valuing !== 1 && messages.map((msg) => {
                    if (msg.text.choose === 2 && msg.round === 1 && (msg.text.clocker.gmt === undefined || msg.text.clocker.gmt.seconds*1000 + Date.now())) {
                        if (selectedValueTwo === '전체' || selectedValueTwo === msg.text.count || !selectedValueTwo) {
                            return(
                                <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter} selectedValueOne={selectedValueOne} selectedValueTwo={selectedValueTwo} selectedValueThree={selectedValueThree} />
                            )
                        }
                    }
                })}
        </div>
    </div>
  )
}

export default Notice
