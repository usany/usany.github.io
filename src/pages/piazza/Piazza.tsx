import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { dbservice } from "src/baseApi/serverbase";
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogTrigger } from "src/components/ui/morphing-dialog";
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm';
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen';
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
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
  const [multiple, setMultiple] = useState(true)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [chattingUser, setChattingUser] = useState(null)
  // const conversation = state?.conversation || 'piazza'
  // console.log(state)
  useEffect(() => {
    const bringChattingUser = async () => {
      if (state?.chattingUid) {
        const toUserRef = doc(dbservice, `members/${state.chattingUid}`)
        const toUser = await getDoc(toUserRef)
        setChattingUser(toUser.data())
      }
    }
    if (!state?.multiple) {
      bringChattingUser()
    }
  }, [state])
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

  useEffect(() => {
    if (state?.multiple !== undefined) {
      setMultiple(state?.multiple)
    }
  }, [])
  // const { keyBoardOffset, windowHeight } = useKeyboardOffset();
  // console.log(keyBoardOffset, windowHeight);
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
  const displayName = state?.displayName
  return (
    <>
      {!isKeyboardOpen && <PiazzaTitle multiple={multiple} displayName={displayName} />}
      <PiazzaScreen isKeyboardOpen={piazzaForm} userObj={userObj} multiple={multiple} handleMultiple={(newValue) => setMultiple(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
      {/* {calls && <PiazzaCalls />} */}
      <PiazzaForm chattingUser={chattingUser} userObj={userObj} multiple={multiple} messages={messages} handleMessages={(newValue) => setMessages(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
      <MorphingDialog>
        <MorphingDialogTrigger>
          <div id='calls'></div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <div>
            <div className='flex gap-5'>
              <PiazzaCalls />
            </div>
            <MorphingDialogClose>
              <div>전화 종료</div>
            </MorphingDialogClose>
          </div>
        </MorphingDialogContainer>
      </MorphingDialog>
    </>
  );
}

export default Piazza;
