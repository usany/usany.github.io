import { useState, useEffect, useLayoutEffect } from 'react'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'

function Lists({ elements, multiple, userSearch }) {

  return (
    <div>
      <div className='flex justify-between w-screen'>
        <div className='flex flex-col justify-center px-5'>
          {multiple ? '유저':'내'} 랭킹
        </div>
        <div className='flex flex-col overflow-hidden'>
          <div>{multiple ? '유저':'내'} 이름</div>
          <div>포인트</div>
        </div>
        <div className='flex flex-col justify-center px-5'>
          프로필
        </div>
      </div>
      {/* {!userSearch &&
        <div className='flex justify-between w-screen'>
          <div className='flex'>
            <div className='flex flex-col justify-center px-5'>
              {multiple ? '유저':'내'}  랭킹
            </div>
            <div>
              <div>{multiple ? '유저':'내'} 이름</div> 
              <div>포인트</div> 
            </div>
          </div>
          <div className='flex flex-col justify-center px-5'>
            프로필
          </div>
        </div>
      } */}
      <div className='bg-light-3 dark:bg-dark-3'>
        {elements.map((element, index) => {
          let userNameConfirm = true
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.displayName[number] !== userSearch[number]) {
                userNameConfirm = false
              }
            }
          }
          if (userNameConfirm) {
            return (
              <div key={index}>
                <div className={`flex justify-between w-screen p-3 ranking-${index+1}`}>
                  <div className='flex'>
                    {!multiple ? 
                      <div className='flex flex-col justify-center px-5 w-20'>
                        {element.rank}
                      </div>
                    :
                      <div className='flex flex-col justify-center px-5 w-20'>
                        {index+1}
                      </div>
                    }
                    {element?.profileImageUrl && 
                      <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={element?.profileImageUrl || './src'} variant="rounded" />
                    }
                    {!element?.profileImageUrl && 
                      <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={'./src'} variant="rounded" />
                    }
                    <div className='flex flex-col overflow-hidden px-10 w-48'>
                      <div className='overflow-hidden'>
                        {element.displayName}
                      </div>
                      <div className='overflow-hidden'>
                        {element.points}
                      </div>
                    </div>
                  </div>
                  <IconButton aria-label="comment">
                    <Link to='/profile'
                      state = {{
                        element: element,
                      }}
                    >
                      <CommentIcon />
                    </Link>
                  </IconButton>
                </div>
                <Divider variant="inset" />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Lists
