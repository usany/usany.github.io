import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
// import Avatar from '@mui/material/Avatar';
// import BeachAccess from '@mui/icons-material/BeachAccess'
// import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { auth, dbservice } from 'src/baseApi/serverbase'
// import { storage } from "src/baseApi/serverbase";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

function PiazzaDialogs({ selectUser, user, handleClose, userObj, handleMsgList, handleChangeMessage }) {
    const [conversation, setConversation] = useState(null)
    useEffect(() => {
        if (selectUser) {
            if (user?.uid < userObj.uid) {
                setConversation(user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
            } else {
                setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5])
            }
        }
    }, [selectUser])
    return (
        <Dialog open={selectUser} onClose={handleClose}>
            <DialogContent>
                <div>
                    {user?.displayName}
                </div>
            </DialogContent>
            <DialogActions>
            <Link to='/profile'
            state={{element: user}}
            >
                <Button variant='outlined' onClick={() => {
                    handleClose()
                }}>
                    프로필 확인
                </Button>
            </Link>
            {userObj.uid !== user?.uid && 
            <Link to='/chatting' 
            state={{conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid}}>
                <Button variant='outlined' onClick={() => {
                    handleMsgList([])
                    handleChangeMessage(true)
                    handleClose()
                }}>
                    개인 대화
                </Button>
            </Link>
                }
            <Button variant='outlined' onClick={() => {
                handleClose()
            }}>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PiazzaDialogs
