import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import { User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useCardsBackground from 'src/hooks/useCardsBackground';
import useLongPress from 'src/hooks/useLongPress';
import ChatsBoxes from 'src/pages/core/chatting/ChatsBoxes';
import { changePiazzaSwitch } from 'src/stateSlices/piazzaSwitchSlice';

interface Props {
  userObj: User
  profileUrl: string
  conversation: string
  displayName: string
  chattingUid: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[],
    messageCount: number,
  }
}

const Chats = ({ userObj, profileUrl, conversation, displayName, chattingUid, multiple, clock, message, longPressChat, changeLongPressChat, changeLongPressChatsList, onLongPress, changeOnLongPress, onDelete }: Props) => {
  const [longPressed, setLongPressed] = useState(false)
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const chatsRef = useRef()
  useLongPress(chatsRef, () => {
    if (longPressChat && !onLongPress) {
      setLongPressed(true)
      changeOnLongPress(onLongPress + 1)
      changeLongPressChatsList(conversation || 'piazza')
    }
  })
  useEffect(() => {
    if (!longPressChat && !onLongPress) {
      setLongPressed(false)
      changeOnLongPress(0)
    }
  }, [longPressChat, onLongPress])
  const { color, colorTwo } = useCardsBackground()

  return (
    <div className={`${longPressed && 'flex py-5'}`}>
      {/* <ClickAwayListener onClickAway={() => {
        changeLongPressChat(null)
        changeOnLongPress(0)
      }}> */}
      <div ref={chatsRef} className={`${longPressed && 'longPress flex w-[calc(100%-48px)] py-5'}`}
        onMouseDownCapture={() => {
          const longPress = conversation || 'piazza'
          changeLongPressChat(longPress)
        }}
        // onMouseUp={() => {
        //   setPressed(true)
        // }}
        onTouchStartCapture={() => {
          const longPress = conversation || 'piazza'
          changeLongPressChat(longPress)
        }}
      >
        <Card
          sx={{
            flexGrow: 1, overflow: 'hidden',
            bgcolor: colorTwo,
            ":hover": {
              bgcolor: colorTwo
            }
          }}
        >
          <>
            {!onLongPress ?
              <Link to='/piazza' state={{
                conversation: conversation,
                displayName: displayName,
                userUid: userObj.uid,
                chattingUid: chattingUid,
                multiple: multiple,
              }}>
                <ChatsBoxes chattingUid={chattingUid} userObj={userObj} profileUrl={profileUrl} displayName={displayName} multiple={multiple} clock={clock} message={message} />
              </Link>
              :
              <div
                onClick={() => {
                  if (onLongPress) {
                    setLongPressed(!longPressed)
                    if (longPressed) {
                      changeOnLongPress(onLongPress - 1)
                    } else {
                      changeOnLongPress(onLongPress + 1)
                    }
                  }
                }}
              >
                <ChatsBoxes chattingUid={chattingUid} userObj={userObj} profileUrl={profileUrl} displayName={displayName} multiple={multiple} clock={clock} message={message} />
              </div>
            }
          </>
        </Card>
      </div>
      {/* </ClickAwayListener> */}
      {
        longPressed &&
        // <>
        //   {conversation ?
        //     <div className='h-full' onClick={() => onDelete({conversation: conversation})}>
        //       <Chip label={<DeleteIcon />} color=''/>
        //     </div>
        //   :
        //     <div className='h-full' onClick={() => {
        //       if (conversation) {
        //         onDelete({conversation: conversation})
        //       } else {
        //         dispatch(changePiazzaSwitch('false'))
        //       }
        //     }}>
        //       <Chip label={<DeleteIcon />} color='error'/>
        //     </div>
        //   }
        // </>
        <div className='flex justify-end h-full w-1/6' onClick={() => {
          if (conversation) {
            onDelete({ conversation: conversation })
          } else {
            dispatch(changePiazzaSwitch('false'))
            localStorage.setItem('piazza', 'false')
          }
        }}>
          <Chip sx={{}} label={<DeleteIcon />} color='error' />
          {/* <Chips label={<DeleteIcon />} className='bg-profile-red text-white' /> */}
        </div>
      }
    </div >
  )
}

export default Chats
