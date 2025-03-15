import { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { useSelector, useDispatch } from 'react-redux'

const ProfileAvatar = ({ userObj, user, handleProfileDialog }) => {
    const profileColor = useSelector(state => state.profileColor.value)
    const profileImage = useSelector(state => state.profileImage.value)

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
              }
            >
              <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} src={profileImage || './src'} variant='rounded' />
            </Badge>
          :
            <Avatar alt={user.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || '#2196f3' }} src='./src' variant='rounded'/>
          }
        </div>
    )
}

export default ProfileAvatar
