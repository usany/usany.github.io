import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
// import styled from 'styled-components'

// const NavBtn = styled.button`
//   border: dashed;
// `
// const SignBtn = styled.div`
//   display: flex;
//   justify-content: center;
// `
function Profile({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter }) {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')
  const [message, setMessage] = useState([])
  const [messages, setMessages] = useState([])
  const [newDisplayName, setNewDisplayName] = useState('')
  const [num, setNum] = useState(null)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (newDisplayName === '') {
      alert('입력이 필요합니다')
    } else {
      const data = await doc(dbservice, `members/${userObj.uid}`)
      console.log(userObj.uid)
      await updateDoc(data, {displayName: newDisplayName});
      await updateProfile(userObj, {
        displayName: newDisplayName
      }).then(() => {
        window.location.reload(true)
      }).catch((error) => {
        console.log('error')
      })
    }
  }
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }
  
  const getMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', userObj.uid), orderBy('creatorClock', 'asc'))
    
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setMessages(newArray);
    })
  }
  const getMessages = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', userObj.uid), orderBy('creatorClock', 'asc'))
    
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setMessage(newArray);
    })
  }

  useEffect(() => {
    getMessage()
  })

  useEffect(() => {
    getMessages()
  })
  

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        const number = snapshot.data().points
        console.log(number)
        setNum(number)
    })
  }, [])

  useEffect(() => {
    setNewDisplayName(
      userObj.displayName
    )
  }, [])

  useEffect(() => {
    setValue(5)
  })

  return (  
    <div>
      <div className={side}>
      <div className='flex justify-center'>제 유저 이름은 {userObj.displayName}</div>
      <form id='profile' onSubmit={onSubmit}>
        <div className='flex justify-center'>
          <input className='form-control' placeholder='유저 이름' value={newDisplayName} type='text' onChange={onChange} />
        </div>
        <div className='flex justify-center'>
          <Button variant='outlined' form='profile' type='submit'>유저 이름 바꾸기</Button>
        </div>
      </form>
      <div className='flex justify-center'>
        내 포인트: {num}
      </div>
      <div className='flex justify-center'>
        최근 완료된 빌리기/빌려주기: {message.length+messages.length}
      </div>
      <div className='flex justify-center flex-wrap'>
        {message.map((msg) => {
          if (msg.round === 5) {
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div>
      <div className='flex justify-center flex-wrap'>
        {messages.map((msg) => {
          if (msg.round === 5) { 
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)
          }
        })}
      </div>
      </div>
    </div>
  )
}

export default Profile
