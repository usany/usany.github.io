import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useAvatarColorStore } from 'src/store'

const AvatarDialogs = ({ userObj, changeProfile, handleClose }) => {
    const [selectedColor, setSelectedColor] = useState(null)
    const [attachment, setAttachment] = useState(null)
    const [attachmentFile, setAttachmentFile] = useState(null)
    const profileColor = useAvatarColorStore((state) => state.profileColor)
    const handleProfileColor = useAvatarColorStore((state) => state.handleProfileColor)
    
    const onClick = () => {
        const data = doc(dbservice, `members/${userObj.uid}`)
        if (selectedColor) {   
            updateDoc(data, {profileColor: selectedColor});
            handleProfileColor(selectedColor)
        }
        if (attachment) {   
            const storageRef = ref(storage, userObj.uid);
            uploadBytes(storageRef, attachmentFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        }
    }
    const switchColor = (newColor) => {
        setSelectedColor(newColor)
    }
    useEffect(() => {
        if (!selectedColor) {
            setSelectedColor(profileColor)
        }
    })
    const color = selectedColor || profileColor
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        console.log(theFile)
        reader.readAsDataURL(theFile)
        setAttachmentFile(theFile)
      }
      const onClearAttachment = () => {
        setAttachment(null)
        setAttachmentFile(null)
        const fileInput = document.getElementById('file') || {value:null}
        fileInput.value = null
      }
    
    return (
        <Dialog open={changeProfile} onClose={handleClose}>
            <DialogContent>
                <div>
                    프로필 변경
                </div>
                <div className='flex'>
                <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: color }} src={attachment || './src'} onClick={() => {
                }} />
                <div className='flex-col px-5 content-center'>
                    <div className='flex'>
                        <label for='file'>내 파일 업로드</label>
                    </div>
                    <input id='file' type='file' onChange={onFileChange} hidden />
                    {attachment &&
                        <div className='flex justify-center pt-5'>
                            <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
                        </div>
                    }
                </div>
                </div>
            </DialogContent>
            {/* 'profile-red': '#f44336',
      'profile-pink': '#e91e63',
      'profile-purple': '#9c27b0',
      'profile-deeppurple': '#673ab7',
      'profile-indigo': '#3f51b5',
      'profile-blue': '#2196f3',
      'profile-lightblue': '#03a9f4',
      'profile-cyan': '#00bcd4',
      'profile-teal': '#009688',
      'profile-green': '#4caf50',
      'profile-lightgreen': '#8bc34a',
      'profile-lime': '#cddc39',
      'profile-yellow': '#ffeb3b',
      'profile-amber': '#ffc107',
      'profile-orange': '#ff9800',
      'profile-deeporange': '#ff5722', */}
        <div className='flex'>
            <div>색깔을 선택하면 배경에 반영됩니다.&emsp;</div>
        </div>
            <div className='flex px-1'>
                <div className='w-10 bg-profile-red' onClick={() => switchColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-pink' onClick={() => switchColor('#e91e63')}>&emsp;</div>
                <div className='w-10 bg-profile-purple' onClick={() => switchColor('#9c27b0')}>&emsp;</div>
                <div className='w-10 bg-profile-deeppurple' onClick={() => switchColor('#673ab7')}>&emsp;</div>
                <div className='w-10 bg-profile-indigo' onClick={() => switchColor('#3f51b5')}>&emsp;</div>
                <div className='w-10 bg-profile-blue' onClick={() => switchColor('#2196f3')}>&emsp;</div>
                <div className='w-10 bg-profile-lightblue' onClick={() => switchColor('#03a9f4')}>&emsp;</div>
                <div className='w-10 bg-profile-cyan' onClick={() => switchColor('#00bcd4')}>&emsp;</div>
                <div className='w-10 bg-profile-teal' onClick={() => switchColor('#009688')}>&emsp;</div>
                <div className='w-10 bg-profile-green' onClick={() => switchColor('#4caf50')}>&emsp;</div>
                <div className='w-10 bg-profile-lightgreen' onClick={() => switchColor('#8bc34a')}>&emsp;</div>
                <div className='w-10 bg-profile-lime' onClick={() => switchColor('#cddc39')}>&emsp;</div>
                <div className='w-10 bg-profile-yellow' onClick={() => switchColor('#ffeb3b')}>&emsp;</div>
                <div className='w-10 bg-profile-amber' onClick={() => switchColor('#ffc107')}>&emsp;</div>
                <div className='w-10 bg-profile-orange' onClick={() => switchColor('#ff9800')}>&emsp;</div>
                <div className='w-10 bg-profile-deeporange' onClick={() => switchColor('#ff5722')}>&emsp;</div>
            </div>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
                onClick()
            }}>저장</Button>
            <Button variant='outlined' onClick={() => {
                handleClose()
                setSelectedColor(null)
                setAttachment(null)
            }} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarDialogs
