import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { blue } from '@mui/material/colors';

const ProfileAvatar = ({ userObj, user, handleProfileDialog, attachment, profileColor }) => {
    return (
        <div className='flex justify-center'>
          {user.uid === userObj.uid ? 
            <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <button className='p-1 bg-transparent border-dashed border-2' onClick={handleProfileDialog}>
                <BeachAccess />
              </button>
            }>
              <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor }} src={attachment || './src'} variant='rounded' />
            </Badge>
          :
            <Avatar alt={user.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || blue[500] }} src='./src'/>
          }
        </div>
    )
}

export default ProfileAvatar
