import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'

function AvatarDialogs({ userObj, profileColor, setProfileColor, changeProfile, handleClose }) {
    const [selectedColor, setSelectedColor] = useState(null)
    const onClick = () => {
        const data = doc(dbservice, `members/${userObj.uid}`)
        updateDoc(data, {profileColor: selectedColor});
        setProfileColor(selectedColor)
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
    // console.log(color)
    return (
        <Dialog open={changeProfile} onClose={handleClose}>
            <DialogContent>
                프로필 변경
                <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: color }} src='./src' onClick={() => {
                }} />
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
            <Button variant='outlined' onClick={handleClose} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarDialogs
