import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm';
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen';
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
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
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener);
      }
    };
  }, [isKeyboardOpen]);

  console.log(isKeyboardOpen)
  useEffect(() => {
    if (state?.multiple !== undefined) {
      setMultiple(state?.multiple)
    }
  }, [])
  // const { keyBoardOffset, windowHeight } = useKeyboardOffset();
  // console.log(keyBoardOffset, windowHeight);
  window.addEventListener('resize', () => {
    // For the rare legacy browsers that don't support it
    if (!window.visualViewport) {
      return
    }
    const height = window.visualViewport.height - 200
  })
  visualViewport.addEventListener('resize', () => {
    // For the rare legacy browsers that don't support it
    if (!window.visualViewport) {
      return
    }
    const height = window.visualViewport.height - 200
    console.log(window.visualViewport.height)
  })

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  const displayName = state?.displayName
  return (
    <>
      {/* {isKeyboardOpen && <PiazzaTitle multiple={multiple} displayName={displayName} />} */}
      {!isKeyboardOpen && <PiazzaTitle multiple={multiple} displayName={displayName} />}
      {/* {!isKeyboardOpen && <PiazzaTitle multiple={multiple} displayName={displayName} />} */}
      {/* {isKeyboardOpen ? <div>{window.visualViewport?.height}</div> : <div>{window.visualViewport?.height}</div>} */}
      <PiazzaScreen isKeyboardOpen={isKeyboardOpen} userObj={userObj} multiple={multiple} handleMultiple={(newValue) => setMultiple(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
      <PiazzaForm userObj={userObj} multiple={multiple} messages={messages} handleMessages={(newValue) => setMessages(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
    </>
  );
}

export default Piazza;
