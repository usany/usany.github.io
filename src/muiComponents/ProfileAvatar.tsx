import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'

const ProfileAvatar = ({ userObj, handleProfileDialog, attachment, profileColor }) => {
    return (
        <div className='flex justify-center'>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <button className='p-1 bg-transparent border-dashed border-2' onClick={handleProfileDialog}>
                <BeachAccess />
              </button>
            }
          >
            <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor }} src={attachment || './src'} />
          </Badge>
        </div>
    )
}

export default ProfileAvatar
