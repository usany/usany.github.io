import { useState, useEffect, useLayoutEffect } from 'react'
import Divider from '@mui/material/Divider';
// import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import Avatars from 'src/muiComponents/Avatars'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Minimize2, Maximize2, Captions, Bike, Ellipsis, ChevronRight } from "lucide-react"
import staticImg from 'src/assets/pwa-512x512.png';
import RankingListsTitle from 'src/muiComponents/RankingListsTitle'

function Lists({ elements, multiple, userSearch, ranking, handleUser }) {

  return (
  <div>
    {ranking && <div>
      <RankingListsTitle multiple={multiple}/>
      {/* <div className='flex justify-between w-screen pt-5'>
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
      </div> */}
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
          const profileColor = element?.profileColor
          let userNameConfirm = true
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.displayName[number] !== userSearch[number]) {
                userNameConfirm = false
              }
            }
          }
          if (userNameConfirm) {
            let displayName
            displayName = element.displayName.slice(0, 10)+'......'
            if (element.displayName.length > 10) {
            } else {
              displayName = element.displayName
            }
            
            return (
              <div key={index} className='px-3 pt-3'>
                <Link to='/profile'
                  state = {{
                    element: element,
                  }}
                >
                  <div className={`flex w-full justify-between p-3 ranking-${multiple? index+1 : element.rank}`}>
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
                      <Avatar className={`bg-${profileColor?.indexOf('#') === -1 ? element?.profileColor : 'profile-blue'}`}>
                        <AvatarImage src={element?.profileImageUrl} />
                        <AvatarFallback className='text-xl border-none'>{element?.displayName[0]}</AvatarFallback>
                      </Avatar>
                      {/* <Avatars profile={false} profileColor={'profile-blue'} profileImage={element?.profileImageUrl || 'null'} fallback={element.displayName[0]}/> */}
                      {/* {element?.profileImageUrl && 
                        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={element?.profileImageUrl || './src'} variant="rounded" />
                      }
                      {!element?.profileImageUrl && 
                        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={'./src'} variant="rounded" />
                      } */}
                      <div className='flex flex-col overflow-hidden px-10 w-48'>
                        <div className='overflow-hidden'>
                          {displayName}
                        </div>
                        <div className='overflow-hidden'>
                          {element.points}
                        </div>
                      </div>
                    </div>
                    {/* <div className='flex flex-col justify-center'>
                      <ChevronRight />
                    </div> */}
                    {/* <IconButton aria-label="comment">
                      <Link to='/profile'
                        state = {{
                          element: element,
                        }}
                      >
                        <CommentIcon />
                      </Link>
                    </IconButton> */}
                  </div>
                </Link>
                <Divider variant="inset" />
              </div>
            )
          }
        })}
      </div>
    </div>}
    {!ranking && 
      <div>
        <div className='bg-light-3 dark:bg-dark-3'>
        {elements.map((element, index) => {
          const profileColor = element?.profileColor
          let userNameConfirm = true
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.displayName[number] !== userSearch[number]) {
                userNameConfirm = false
              }
            }
          }
          if (userNameConfirm) {
            let displayName
            if (element.displayName.length > 10) {
              displayName = element.displayName.slice(0, 10)+'......'
            } else {
              displayName = element.displayName.slice(0, 10)+'......'
            }
            return (
              <div key={index} className='px-3 pt-3' onClick={() => handleUser(element)}>
                  <div className={`flex w-full justify-between p-3`}>
                    <div className='flex'>
                      {/* {!multiple ? 
                        <div className='flex flex-col justify-center px-5 w-20'>
                          {element.rank}
                        </div>
                      :
                        <div className='flex flex-col justify-center px-5 w-20'>
                          {index+1}
                        </div>
                      } */}
                      <Avatar className={`bg-${profileColor?.indexOf('#') === -1 ? element?.profileColor : 'profile-blue'}`}>
                        <AvatarImage src={element?.profileImageUrl} />
                        <AvatarFallback className='text-xl border-none'>{element?.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col justify-center overflow-hidden px-10 w-48'>
                        <div className='overflow-hidden'>
                          {displayName}
                        </div>
                        {/* <div className='overflow-hidden'>
                          {element.points}
                        </div> */}
                      </div>
                    </div>
                  </div>
                <Divider variant="inset" />
              </div>
            )
          }
        })}
      </div>
      </div>
    }
    </div>
  )
}

export default Lists
