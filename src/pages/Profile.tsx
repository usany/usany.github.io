import { useState, useEffect, useMemo } from 'react'
import Message from 'src/pages/Message'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import { useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
  userObj: {uid: string, displayName: string},
}

function Profile({ userObj }: Props
//   {
//   profileColor: string,
//   setProfileColor: (newState: string) => void,
//   userObj: {uid: string, displayName: string},
//   setBottomNavigation: (newState: number) => void
// }
) {
  const [borrowRegisteredMessage, setBorrowRegisteredMessage] = useState([])
  const [borrowMessage, setBorrowMessage] = useState([])
  const [lendRegisteredMessage, setLendRegisteredMessage] = useState([])
  const [lendMessage, setLendMessage] = useState([])
  const [newDisplayName, setNewDisplayName] = useState('')
  const [num, setNum] = useState(null)
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(null)
  const [attachment, setAttachment] = useState('')
  const [changeProfile, setChangeProfile] = useState(false)
  const [followerNum, setFollowerNum] = useState(null)
  const {state} = useLocation()
  const [myFollowerNumber, setMyFollowerNumber] = useState(null)
  const [myFollowingNumber, setMyFollowingNumber] = useState(null)
  const [myFollowerList, setMyFollowerList] = useState([])
  const [myFollowingList, setMyFollowingList] = useState([])
  const [otherFollowerNumber, setOtherFollowerNumber] = useState(null)
  const [otherFollowingNumber, setOtherFollowingNumber] = useState(null)
  const [otherFollowerList, setOtherFollowerList] = useState([])
  const [otherFollowingList, setOtherFollowingList] = useState([])
  // const [followers, setFollowers] = useState([])
  // const [followings, setFollowings] = useState([])
  const [followersName, setFollowersName] = useState([])
  const [followingsName, setFollowingsName] = useState([])
  // const [checkAllies, setCheckAllies] = useState(false)
  const [userFollowersList, setUserFollowersList] = useState([])
  const [followButton, setFollowButton] = useState(true)
  const [conversation, setConversation] = useState('')
  const profileColor = useAvatarColorStore((state) => state.profileColor)
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)

  useEffect(() => {
    const userFollowCollection = async () => {
      const docRef = doc(dbservice, `members/${userObj.uid}`)
      const docSnap = await getDoc(docRef)
      const followingsList = docSnap.data().followings || []
      if (followingsList.indexOf(state.element.uid) !== -1) {
        setFollowButton(false)
      }
      const followersCollection = []
      followingsList.forEach(async (element) => {
        const docRef = doc(dbservice, `members/${element}`)
        const docSnap = await getDoc(docRef)
        const follower = docSnap.data().uid
        followersCollection.push(follower)
        if (userFollowersList.indexOf(follower) === -1) {
          setUserFollowersList([...userFollowersList, follower])
        }
      })
    }
    userFollowCollection()
  })
  useEffect(() => {
    const alliesCollection = async () => {
      const docRef = doc(dbservice, `members/${state.element.uid}`)
      const docSnap = await getDoc(docRef)
      const followersList = docSnap.data().followers || []
      const followingsList = docSnap.data().followings || []
      const followersCollection = []
      const followingsCollection = []
  
      followersList.forEach(async (element) => {
        const docRef = doc(dbservice, `members/${element}`)
        const docSnap = await getDoc(docRef)
        const follower = docSnap.data().uid
        followersCollection.push(follower)
        setFollowersName([...followersCollection, follower])
      })
      followingsList.forEach(async (element) => {
        const docRef = doc(dbservice, `members/${element}`)
        const docSnap = await getDoc(docRef)
        const following = docSnap.data().uid
        followingsCollection.push(following)
        setFollowingsName([...followingsCollection, following])
      })
    }
    alliesCollection()
  }, [])

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${state.element.uid}`)), (snapshot) => {
      const element = snapshot.data().followerNum
      setFollowerNum(element)
    })
  }, [])

  useEffect(() => {
    const allies = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const otherUserDocRef = doc(dbservice, `members/${state.element.uid}`)
      const otherUserDocSnap = await getDoc(otherUserDocRef)  
      const myFollowerNum = myDocSnap.data().followerNum
      const myFollowingNum = myDocSnap.data().followingNum
      const myFollowerList = myDocSnap.data().followers
      const myFollowingList = myDocSnap.data().followings
      const otherUserFollowerNum = otherUserDocSnap.data().followerNum
      const otherUserFollowingNum = otherUserDocSnap.data().followingNum
      const otherUserFollowerList = otherUserDocSnap.data().followers
      const otherUserFollowingList = otherUserDocSnap.data().followings
      const followerNum = myFollowerNum || 0
      const followingNum = myFollowingNum || 0
      const followerList = myFollowerList || []
      const followingList = myFollowingList || []
      const otherFollowerNum = otherUserFollowerNum || 0
      const otherFollowingNum = otherUserFollowingNum || 0
      const otherFollowerList = otherUserFollowerList || []
      const otherFollowingList = otherUserFollowingList || []
      setMyFollowerNumber(followerNum)
      setMyFollowerList(followerList)
      setMyFollowingNumber(followingNum)
      setMyFollowingList(followingList)
      setOtherFollowerNumber(otherFollowerNum)
      setOtherFollowerList(otherFollowerList)
      setOtherFollowingNumber(otherFollowingNum)
      setOtherFollowingList(otherFollowingList)
    }
    allies()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (newDisplayName === '') {
      alert('입력이 필요합니다')
    } else {
      const tmp = query(collection(dbservice, `members`))
      const querySnapshot = await getDocs(tmp);
      let profileConfirmed = true
      querySnapshot.forEach((doc) => {
        if (newDisplayName === doc.data().displayName) {
          alert('중복 확인이 필요합니다')
          profileConfirmed = false
        }
      });
      if (!profileConfirmed) {
        alert('중복 확인을 완료해 주세요')
      } else {
      const data = await doc(dbservice, `members/${userObj.uid}`)
      await updateDoc(data, {displayName: newDisplayName});
      await updateProfile(userObj, {
        displayName: newDisplayName
      }).then(() => {
        alert('교체 완료')
      }).catch((error) => {
        console.log('error')
      })
      }
    }
  }
  
  const onChange = async (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp);
    let profileConfirmed = true
    querySnapshot.forEach((doc) => {
      if (value === doc.data().displayName) {
        profileConfirmed = false
      }
    });
    if (profileConfirmed) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
  }
  
  const getBorrowRegisteredMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 1), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setBorrowRegisteredMessage(newArray);
    })
  }
  const getBorrowMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 2), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setBorrowMessage(newArray);
    })
  }
  const getLendRegisteredMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 2), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setLendRegisteredMessage(newArray);
    })
  }
  const getLendMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', state.element.uid), where('round', '==', 5), where('text.choose', '==', 1), orderBy('creatorClock', 'asc'))
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setLendMessage(newArray);
    })
  }

  useEffect(() => {
    getBorrowRegisteredMessage()
  }, [])
  useEffect(() => {
    getBorrowMessage()
  }, [])
  useEffect(() => {
    getLendRegisteredMessage()
  }, [])
  useEffect(() => {
    getLendMessage()
  }, [])
  
  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        const number = snapshot.data().points
        setNum(number)
    })
  }, [])

  useEffect(() => {
    setNewDisplayName(
      userObj.displayName
    )
  }, [])

  useEffect(() => {
    handleBottomNavigation(5)
  })

  // const confirmProfile = async (newDisplayName) => {
  //   const tmp = query(collection(dbservice, `members`))
  //   const querySnapshot = await getDocs(tmp);
  //   let profileConfirmed = true
  //   querySnapshot.forEach((doc) => {
  //     if (newDisplayName === doc.data().displayName) {
  //       profileConfirmed = false
  //     }
  //   });
  //   if (profileConfirmed) {
  //     setProfileChangeConfirmed(true)
  //   } else {
  //     setProfileChangeConfirmed(false)
  //   }
  // }
  // const onFileChange = (event) => {
  //   const {
  //       target: { files },
  //   } = event;
  //   const theFile = files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = (finishedEvent) => {
  //       console.log(finishedEvent);
  //       const {
  //           currentTarget: { result },
  //       } = finishedEvent;
  //       setAttachment(result);
  //   }
  //   console.log(theFile)
  //   reader.readAsDataURL(theFile)
  // }
  const onClearAttachment = () => {
    setAttachment('')
    const fileInput = document.getElementById('img') || {value:null}
    fileInput.value = null
  }
  const handleClose = () => {
    setChangeProfile(false)
  }
  const user = state.element.displayName

  const followUser = async (uid) => {
    const myDocRef = doc(dbservice, `members/${userObj.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${state.element.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowerNum = myDocSnap.data().followerNum
    const myFollowingNum = myDocSnap.data().followingNum
    const otherUserFollowerNum = otherUserDocSnap.data().followerNum
    const otherUserFollowingNum = otherUserDocSnap.data().followingNum
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowingList.indexOf(state.element.uid) === -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum+1,
          followings: [...myFollowings, state.element.uid]
        })
        setMyFollowingNumber(myFollowingNum+1)
        setMyFollowingList([...myFollowings, state.element.uid])
      }
    } else {
      await updateDoc(myDocRef, {
        followingNum: 1,
        followings: [state.element.uid]
      })
      setMyFollowingNumber(1)
      setMyFollowingList([state.element.uid])
    }
    if (otherUserFollowerNum) {
      if (otherFollowerList.indexOf(userObj.uid) === -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum+1,
          followers: [...otherFollowers, userObj.uid]
        })
        setOtherFollowerNumber(otherFollowerNumber+1)
        setOtherFollowerList([...otherFollowers, userObj.uid])
      }
    } else {
      await updateDoc(otherUserDocRef, {
        followerNum: 1,
        followers: [userObj.uid]
      })
      setOtherFollowerNumber(1)
      setOtherFollowerList([userObj.uid])
    }
    setFollowButton(false)
  }
  const unfollowUser = async (uid) => {
    const myDocRef = doc(dbservice, `members/${userObj.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${state.element.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowerNum = myDocSnap.data().followerNum
    const myFollowingNum = myDocSnap.data().followingNum
    const otherUserFollowerNum = otherUserDocSnap.data().followerNum
    const otherUserFollowingNum = otherUserDocSnap.data().followingNum
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowingList.indexOf(state.element.uid) !== -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum-1,
          followings: myFollowings.filter((element) => element !== state.element.uid)
        })
        setMyFollowerNumber(myFollowingNum-1)
        setMyFollowerList(myFollowings.filter((element) => element !== state.element.uid))
      }
    }
    if (otherUserFollowerNum) {
      if (otherFollowerList.indexOf(userObj.uid) !== -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum-1,
          followers: otherFollowers.filter((element) => element !== userObj.uid)
        })
        setOtherFollowerNumber(otherFollowerNumber-1)
        setOtherFollowerList(otherFollowers.filter((element) => element !== userObj.uid))
      }
    }
    setFollowButton(true)
  }
  useEffect(() => {
    if (state.element.uid < userObj.uid) {
      setConversation(state.element.uid[0]+state.element.uid[1]+state.element.uid[2]+state.element.uid[3]+state.element.uid[4]+state.element.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
    } else {
      setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+state.element.uid[0]+state.element.uid[1]+state.element.uid[2]+state.element.uid[3]+state.element.uid[4]+state.element.uid[5])
    }
  }, [])
  return (
    <div>
      {state.element.uid === userObj.uid ?
    <div>
      <div className='flex text-2xl p-5'>
          {userObj.displayName} 프로필
      </div>
      <div>
      <div className='flex justify-center pt-5'>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <button onClick={() => {
              setChangeProfile(true)
            }}>
              <div className='p-1 bg-transparent border-dashed border-2'>
                <BeachAccess />
              </div>
            </button>
          }
        >
          <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor }} src='./src'/>
        </Badge>
        <AvatarDialogs userObj={userObj} changeProfile={changeProfile} handleClose={handleClose} />
      </div>
      {attachment &&
        <div className='flex justify-center'>
          <img src={attachment} width='50px' height='50px' alt='alt' />
          <button className='factoryClear' onClick={onClearAttachment}>Clear</button>
        </div>
      }
      <div className='flex justify-center'>제 유저 이름은 {userObj.displayName}</div>
      <form id='profile' onSubmit={onSubmit}>
        <div className='flex justify-center'>
          <div className='flex flex-col justify-center'>
            유저 이름 바꾸기:&emsp;
        {profileChangeConfirmed ? 
          <div className='flex justify-center'>
            <div>
              다행히 중복되지 않네요
            </div>
          </div>
          :
          <div className='flex justify-center'>
            <div>
              아쉽게도 중복되네요
            </div>
          </div>
        }
          </div>
          <div className='flex flex-col'>
            <TextField placeholder='유저 이름' value={newDisplayName} type='text' onChange={onChange} />
            {profileChangeConfirmed ? 
                <Button variant='outlined' form='profile' type='submit'>유저 이름 바꾸기</Button>
            :
                <Button variant='outlined' form='profile' type='submit' disabled>유저 이름 바꾸기</Button>
            }
          </div>
        </div>
        <div className='flex justify-center'>
          <Link to='/allies' 
            state={{
              uid: userObj.uid, 
              displayName: userObj.displayName,
              followerList: myFollowerList, 
              allies: 'followers',
              alliesCollection: followersName,
              }}>
            <div className='border border-solid px-5'>
              팔로워: {myFollowerNumber} 
            </div>
          </Link>
          <Link to='/allies' 
            state={{
              uid: userObj.uid, 
              displayName: userObj.displayName,
              followingsList: myFollowingList, 
              allies: 'followings',
              alliesCollection: followingsName,
            }}>
            <div className='border border-solid px-5'>
              팔로잉: {myFollowingNumber}
            </div>
          </Link>
        </div>
      </form>
      {/* <div className='flex justify-center'>
        내 포인트: {num}
      </div> */}
      <div className='flex justify-center'>
        <Card
      >
        <CardActionArea>
          <Link 
            to='/points'
            state={{
              user: user,
              points: num,
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>포인트</div>
          <div className='flex justify-center'>{num}</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/actions'
            state={{
              user: user,
              actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌려주기</div>
          <div className='flex justify-center'>{lendMessage.length+lendRegisteredMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/actions'
            state={{
              user: user,
              actions: 'completedBorrow', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌리기</div>
          <div className='flex justify-center'>{borrowRegisteredMessage.length+borrowMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      </div>
      </div>
    </div>
    :
    <div>
      <div className='flex text-2xl p-5'>
        {state.element.displayName} 프로필
      </div>
      <div>
      <div className='flex justify-center pt-5'>
        <Avatar alt={state.element.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: state.element?.profileColor || blue[500] }} src='./src'/>
      </div>
      <div className='flex justify-center'>유저 이름: {state.element.displayName}</div>
      <div className='flex justify-center'>
        <Link to='/allies' 
          state={{
            uid: state.element.uid, 
            displayName: state.element.displayName,
            followerList: myFollowerList, 
            allies: 'followers',
            alliesCollection: followersName,
            }}>
          <div className='border border-solid px-5'>
            팔로워: {otherFollowerNumber} 
          </div>
        </Link>
        <Link to='/allies' 
          state={{
            uid: state.element.uid, 
            displayName: state.element.displayName,
            followerList: myFollowerList, 
            allies: 'followers',
            alliesCollection: followersName,
            }}>
          <div className='border border-solid px-5'>
            팔로잉: {otherFollowingNumber} 
          </div>
        </Link>
      </div>
      <div className='flex justify-center'>
        {followButton ?
        <Button variant='outlined' sx={{overflow: 'hidden'}} onClick={() => {
          followUser(state.element.uid)
        }}>
          팔로우 {state.element.displayName}
        </Button>
        :
        <Button variant='outlined' sx={{overflow: 'hidden'}} onClick={() => {
          unfollowUser(state.element.uid)
        }}>
          팔로우 취소 {state.element.displayName}
        </Button>
        }
        <Link to='/chatting' state={{conversation: conversation, displayName: state.element.displayName, userUid: userObj.uid, chattingUid: state.element.uid}}>
          <Button variant='outlined' sx={{overflow: 'hidden'}}>메세지 전송</Button>
        </Link>
      </div>
      <div className='flex justify-center'>
        <Card
      >
        <CardActionArea 
        >
          <Link 
            to='/points'
            state={{
              user: user,
              points: num,
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>포인트</div>
          <div className='flex justify-center'>{state.element.points}</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea 
        >
          <Link 
            to='/actions'
            state={{
              user: user,
              actions: 'completedLend', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
            <CardContent>
              <div>완료된 빌려주기</div>
              <div className='flex justify-center'>{lendRegisteredMessage.length+lendMessage.length}회</div>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
        <Card
      >
        <CardActionArea
        >
          <Link 
            to='/actions'
            state={{
              user: user,
              actions: 'completedBorrow', 
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>완료된 빌리기</div>
          <div className='flex justify-center'>{borrowRegisteredMessage.length+borrowMessage.length}회</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      </div>
      </div>
    </div>
    }
    </div>
  )
}

export default Profile