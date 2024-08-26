import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

function AvatarDialogs({ userObj, profileColor, setProfileColor, changeProfile, handleClose }) {
    const [color, setColor] = useState('ffffff')
    return (
        <Dialog open={changeProfile} onClose={handleClose}>
            <DialogContent>
                프로필 변경
                <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor }} src='./src' onClick={() => {
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
            <div className='flex px-1'>
                <div className='w-10 bg-profile-red' onClick={() => setColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-pink' onClick={() => setColor('#e91e63')}>&emsp;</div>
                <div className='w-10 bg-profile-deeppurple' onClick={() => setColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-indigo' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-blue' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-lightblue' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-cyan' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-teal' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-green' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-lightgreen' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-lime' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-yellow' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-amber' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-orange' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-deeporange' onClick={() => setProfileColor('#f44336')}>&emsp;</div>
            </div>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
                setProfileColor()
            }}>저장</Button>
            <Button variant='outlined' onClick={handleClose} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarDialogs
