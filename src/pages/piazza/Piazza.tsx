import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from "react-router-dom";
import { dbservice } from "src/baseApi/serverbase";
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogTrigger } from "src/components/ui/morphing-dialog";
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm';
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen';
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
import { webSocket } from "src/webSocket";
import PiazzaAudioCall from "./PiazzaAudioCall";
import PiazzaCalls from "./PiazzaCalls";
// import { useKeyboardOffset } from 'virtual-keyboard-offset';

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const [messages, setMessages] = useState("");
  const [messagesList, setMessagesList] = useState<[]>([]);
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [chattingUser, setChattingUser] = useState(null)
  const [chatUid, setChatUid] = useState('')
  const [chatDisplayName, setChatDisplayName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChatUid = (newValue) => {
    setChatUid(newValue)
  }
  const handleChatDisplayName = (newValue) => {
    setChatDisplayName(newValue)
  }
  const conversation = location.search.slice(location.search.indexOf('=') + 1)
  console.log(chattingUser)
  console.log(chatUid)
  useEffect(() => {
    if (state) {
      setChatUid(state.chattingUid)
      setChatDisplayName(state.displayName)
    } else {
      setChatUid('')
      setChatDisplayName('')
    }
  }, [conversation])
  useEffect(() => {
    const bringChattingUser = async () => {
      if (chatUid) {
        const toUserRef = doc(dbservice, `members/${chatUid}`)
        const toUser = await getDoc(toUserRef)
        setChattingUser(toUser.data())
      }
    }
    if (conversation) {
      bringChattingUser()
    }
  }, [conversation, chatUid])
  const piazzaForm = useSelector((state) => state.piazzaForm.value)
  useEffect(() => {
    const listener = () => {
      const newState = window.screen.height - 300 > (window.visualViewport?.height || window.screen.height)
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState);
      }
    };
    window.addEventListener('resize', listener)
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', listener);
    }
    visualViewport?.addEventListener('resize', listener)
    if (typeof visualViewport !== 'undefined') {
      visualViewport?.addEventListener('resize', listener);
    }
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener);
      }
    };
  }, [isKeyboardOpen]);
  const stopCalls = async () => {
    setSearchParams(searchParams => {
      searchParams.delete('call')
      return searchParams
    })
    document.getElementById('myScreen')?.srcObject.getTracks()
      .forEach(track => track.stop())
    let toUserRef
    let toUser
    let messagingToken
    let preferLanguage
    if (chattingUser) {
      toUserRef = doc(dbservice, `members/${chattingUser.uid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
      preferLanguage = toUser.data()?.preferLanguage
    }
    const passingObject = {
      conversation: conversation,
      isVideo: true,
      sendingToken: messagingToken,
      connectedUrl: `/piazza?id=${conversation}&call=video`,
      preferLanguage: preferLanguage,
      userUid: userObj.uid,
      id: userObj.displayName,
      conversationUid: chattingUser?.uid,
      conversationName: chattingUser?.displayName,
      // profileImage: profileImage,
      // defaultProfile: defaultProfile,
      // profileImageUrl: profileImageUrl,
      // profileUrl: profileUrl,
    };
    console.log(passingObject)
    webSocket.emit('call', passingObject)
  }
  // useEffect(() => {
  //   if (state?.multiple !== undefined) {
  //     setMultiple(state?.multiple)
  //   }
  // }, [])
  // const { keyBoardOffset, windowHeight } = useKeyboardOffset();
  // For the rare legacy browsers that don't support it
  // window.addEventListener('resize', () => {
  //   if (!window.visualViewport) {
  //     return
  //   }
  //   const height = window.visualViewport.height - 200
  // })
  // For the rare legacy browsers that don't support it
  // visualViewport.addEventListener('resize', () => {
  //   if (!window.visualViewport) {
  //     return
  //   }
  //   const height = window.visualViewport.height - 200
  //   console.log(window.visualViewport.height)
  // })

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  useEffect(() => {
    if (searchParams.get('call') === 'video') {
      document.getElementById('videoCall')?.click()
    }
    if (searchParams.get('call') === 'audio') {
      document.getElementById('audioCall')?.click()
    }
  }, [])
  return (
    <>
      {!isKeyboardOpen && <PiazzaTitle multiple={!conversation} displayName={chatDisplayName} />}
      <PiazzaScreen isKeyboardOpen={piazzaForm} userObj={userObj} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)}
        handleChatUid={handleChatUid}
        handleChatDisplayName={handleChatDisplayName}
      />
      <PiazzaForm chattingUser={chattingUser} userObj={userObj} multiple={!conversation} messages={messages} handleMessages={(newValue) => setMessages(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
      <MorphingDialog>
        <MorphingDialogTrigger>
          <div id='videoCall'></div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <div>
            <div className='flex gap-5'>
              <PiazzaCalls />
            </div>
            <MorphingDialogClose>
              <div onClick={stopCalls}>전화 종료</div>
            </MorphingDialogClose>
          </div>
        </MorphingDialogContainer>
      </MorphingDialog>
      <MorphingDialog>
        <MorphingDialogTrigger>
          <div id='audioCall'></div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <div>
            <div className='flex gap-5'>
              <PiazzaAudioCall />
            </div>
            <MorphingDialogClose>
              <div onClick={stopCalls}>전화 종료</div>
            </MorphingDialogClose>
          </div>
        </MorphingDialogContainer>
      </MorphingDialog>
    </>
  );
}

export default Piazza;
