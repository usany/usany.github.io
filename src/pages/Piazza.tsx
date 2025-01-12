import { useRef, useEffect, useState, useMemo, lazy } from "react";
import "./Chatting.css";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaScreen from 'src/muiComponents/PiazzaScreen'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { User } from "firebase/auth";
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { Link, useLocation } from 'react-router-dom'
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PiazzaTitle from 'src/muiComponents/PiazzaTitle'

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const messagesEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState<[]>([]);
  const [changeMessage, setChangeMessage] = useState<boolean>(true)
  // const [privateTarget, setPrivateTarget] = useState("");
  // const [selectUser, setSelectUser] = useState(false)
  const [user, setUser] = useState(null)
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const [displayedName, setDisplayedName] = useState('')
  const dispatch = useDispatch()
  const {state} = useLocation()
  const multiple = state?.multiple || true
  const conversation = state?.conversation

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  const onPrivate = async ({ userUid, displayName }) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setDisplayedName(displayName)
  };
    
  const displayName = state?.displayName
  return (
    <>
      <PiazzaTitle multiple={multiple} displayName={displayName} />
      <PiazzaScreen userObj={userObj} onPrivate={onPrivate}/>
      <PiazzaDialogs multiple={multiple} user={user} userObj={userObj} handleMsgList={(newState: []) => setMsgList(newState)} handleChangeMessage={(newState: boolean) => setChangeMessage(newState)} displayedName={displayedName}/>
    </>
  );
}

export default Piazza;
