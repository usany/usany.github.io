import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm';
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen';
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
import { useKeyboardOffset } from 'virtual-keyboard-offset';

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const [messages, setMessages] = useState("");
  const [messagesList, setMessagesList] = useState<[]>([]);
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [multiple, setMultiple] = useState(true)
  useEffect(() => {
    if (state?.multiple !== undefined) {
      setMultiple(state?.multiple)
    }
  }, [])
  const { keyBoardOffset, windowHeight } = useKeyboardOffset();
  console.log(keyBoardOffset, windowHeight);


  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  const displayName = state?.displayName
  return (
    <>
      <PiazzaTitle multiple={multiple} displayName={displayName} />
      <PiazzaScreen userObj={userObj} multiple={multiple} handleMultiple={(newValue) => setMultiple(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
      <PiazzaForm userObj={userObj} multiple={multiple} messages={messages} handleMessages={(newValue) => setMessages(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
    </>
  );
}

export default Piazza;
