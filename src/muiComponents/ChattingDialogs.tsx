import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom'

function ChattingDialogs({ selectUser, user, handleClose, userObj, setMsgList, setChangeMessage }) {
    const [conversation, setConversation] = useState(null)
    // const changeSelectedValueOne = (event) => {
    //     event.preventDefault()
    //     const {
    //         target: {value},
    //     } = event
    //     setSelectedValueOne(value)
    // }
    // const changeSelectedValueTwo = (event) => {
    //     event.preventDefault()
    //     const {
    //         target: {value},
    //     } = event
    //     setSelectedValueTwo(value)
    // }
    // const changeSelectedValueThree = (event) => {
    //     event.preventDefault()
    //     const {
    //         target: {value},
    //     } = event
    //     setSelectedValueThree(value)
    // }
    // console.log(selectedValueOne)
    useEffect(() => {
        if (selectUser) {
            if (user?.uid < userObj.uid) {
                setConversation(user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
            } else {
                setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+user?.uid[0]+user?.uid[1]+user?.uid[2]+user?.uid[3]+user?.uid[4]+user?.uid[5])
            }
        }
    }, [selectUser])
    console.log(user)
    return (
        <Dialog open={selectUser} onClose={handleClose}>
            <DialogContent>
                <div>
                    {user?.displayName}
                </div>
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >우산 / 양산 선택
                </InputLabel> */}
                {/* <Select
                    value={selectedValueOne || '전체'}
                    onChange={changeSelectedValueOne}
                > */}
                    {/* <MenuItem value={'one'}>one</MenuItem>
                    <MenuItem value={'focus'}>focus</MenuItem>
                    <MenuItem value={'two'}>two</MenuItem>
                    <MenuItem value={'three'}>three</MenuItem>
                    <MenuItem value={'four'}>four</MenuItem> */}
                    {/* <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'우산'}>우산</MenuItem>
                    <MenuItem value={'양산'}>양산</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >장소 선택
                </InputLabel>
                <Select
                    value={selectedValueTwo || '전체'}
                    onChange={changeSelectedValueTwo}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >시간 정렬
                </InputLabel>
                <Select
                    value={selectedValueThree || '최신순'}
                    onChange={changeSelectedValueThree}
                >
                    <MenuItem value={'최신순'}>최신순</MenuItem>
                    <MenuItem value={'오래된'}>오래된</MenuItem>
                </Select>
            </FormControl> */}
            </DialogContent>
            <DialogActions>
            <Link to='/postings/profile'
            state={{element: user}}
            >
                <Button variant='outlined' onClick={() => {
                    handleClose()
                }}>
                        프로필 확인
                </Button>
            </Link>
            {/* {userObj.uid !== user?.uid && <Button variant='outlined' onClick={() => {
                setMsgList([])
                setChangeMessage(true)
                handleClose()
            }}>
                <Link to='/postings/chatting' 
                state={{conversation: conversation, displayName: user?.displayName}}>
                    개인 대화
                </Link>
                </Button>} */}
            <Button variant='outlined' onClick={() => {
                handleClose()
            }}>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChattingDialogs