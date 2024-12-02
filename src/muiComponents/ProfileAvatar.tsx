import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { blue } from '@mui/material/colors';
import { useAvatarColorStore, useAvatarImageStore } from 'src/store'

const ProfileAvatar = ({ userObj, user, handleProfileDialog, attachment, profileColor }) => {
    const avatarImage = useAvatarImageStore((state) => state.avatarImage)
    const avatarColor = useAvatarColorStore((state) => state.avatarColor)
    console.log(user) 
    
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
              <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: avatarColor || blue[500] }} src={avatarImage || './src'} variant='rounded' />
              {/* {userObj.uid === user.uid ?
                <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: avatarColor || blue[500] }} src={avatarImage || './src'} variant='rounded' />
                :
                <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || blue[500] }} src={avatarImage || './src'} variant='rounded' />
              } */}
            </Badge>
          :
            <Avatar alt={user.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || blue[500] }} src='./src' variant='rounded'/>
          }
        </div>
    )
}

export default ProfileAvatar
