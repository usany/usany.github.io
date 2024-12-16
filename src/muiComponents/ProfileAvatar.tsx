import { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';

const ProfileAvatar = ({ userObj, user, handleProfileDialog }) => {
    const profileColor = useSelector(state => state.profileColor.value)
    const profileImage = useSelector(state => state.profileImage.value)

    return (
        <div className='flex justify-center'>
          {user.uid === userObj.uid ? 
            <div>
              {profileImage &&
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <button className='p-1 bg-transparent border-dashed border-2' onClick={handleProfileDialog}>
                      <BeachAccess />
                    </button>
                  }
                >
                  {profileImage === 'null' &&
                    <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} src={'./src'} variant='rounded' />
                  }
                  {profileImage && profileImage !== 'null' && 
                    <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px' }} src={profileImage} variant='rounded' />
                  }
                  {/* {!profileImage && 
                    <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} 
                    src={'./src'} 
                    variant='rounded' />
                  } */}
                </Badge>
              }
            </div>
          :
            <Avatar alt={user.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || '#2196f3' }} src='./src' variant='rounded'/>
          }
        </div>
    )
}

export default ProfileAvatar
