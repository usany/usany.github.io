import { useRef, useEffect, useState, useMemo, lazy } from "react";
// import "./Chatting.css";
import PiazzaScreen from 'src/muiComponents/PiazzaScreen'
import PiazzaForm from 'src/muiComponents/PiazzaForm'
import { useSelector, useDispatch } from 'react-redux'
import { User } from "firebase/auth";
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { Link, useLocation } from 'react-router-dom'
import PiazzaTitle from 'src/muiComponents/PiazzaTitle'

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const [messages, setMessages] = useState("");
  const [messagesList, setMessagesList] = useState<[]>([]);
  const dispatch = useDispatch()
  const {state} = useLocation()
  const [multiple, setMultiple] = useState(true)
  useEffect(() => {
    if (state?.multiple !== undefined) {
      setMultiple(state?.multiple)
    }
  }, [])

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  
  const displayName = state?.displayName
  return (
    <>
      <PiazzaTitle multiple={multiple} displayName={displayName} />
      <PiazzaScreen userObj={userObj} multiple={multiple} handleMultiple={(newValue) => setMultiple(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)}/>
      <PiazzaForm userObj={userObj} multiple={multiple} messages={messages} handleMessages={(newValue) => setMessages(newValue)} messagesList={messagesList} handleMessagesList={(newValue) => setMessagesList(newValue)} />
    </>
  );
}

export default Piazza;
