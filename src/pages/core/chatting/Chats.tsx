import DeleteIcon from '@mui/icons-material/Delete'
import { ClickAwayListener } from '@mui/material'
import Card from '@mui/material/Card'
import { User } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useCardsBackground from 'src/hooks/useCardsBackground'
import useLongPress from 'src/hooks/useLongPress'
import ChatsBoxes from 'src/pages/core/chatting/ChatsBoxes'
import { changePiazzaSwitch } from 'src/stateSlices/piazzaSwitchSlice'

const ChatsDelete = ({
  userObj,
  sorted,
  conversation,
  changeLongPressChat,
  changeChattings,
}) => {
  const dispatch = useDispatch()
  const onDelete = async ({ conversation }) => {
    const newSortedMyConversationUid = sorted
    newSortedMyConversationUid.splice(sorted.indexOf(conversation), 1)
    changeLongPressChat(null)
    const userRef = doc(dbservice, `members/${userObj.uid}`)
    const userDoc = await getDoc(userRef)
    const userChattings = userDoc.data()?.chattings || {}
    const userConversation = userDoc.data()?.conversation || []
    Reflect.deleteProperty(userChattings, conversation)
    if (userConversation.indexOf(conversation) !== -1) {
      userConversation.splice(userConversation.indexOf(conversation), 1)
    }
    changeChattings(userChattings)
    updateDoc(userRef, { chattings: userChattings })
    updateDoc(userRef, { conversation: userConversation })
  }
  return (
    <div
      className="flex h-[60px] rounded items-center justify-center w-1/6 bg-profile-red text-white"
      onClick={() => {
        if (conversation) {
          onDelete({ conversation: conversation })
        } else {
          dispatch(changePiazzaSwitch('false'))
          localStorage.setItem('piazza', 'false')
        }
      }}
    >
      <DeleteIcon />
    </div>
  )
}
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
    piazzaChecked: string[]
    messageCount: number
  }
}

const Chats = ({
  userObj,
  profileUrl,
  conversation,
  displayName,
  chattingUid,
  multiple,
  clock,
  message,
  longPressChat,
  longPressChatsList,
  changeLongPressChat,
  changeLongPressChatsList,
  onLongPress,
  changeOnLongPress,
  sorted,
  chattings,
  changeChattings,
}: Props) => {
  const [longPressed, setLongPressed] = useState(false)
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
  const { colorTwo } = useCardsBackground()
  const key = conversation || 'piazza'

  return (
    <ClickAwayListener
      key={key}
      onClickAway={() => {
        if (longPressChat === key) {
          changeLongPressChat(null)
          changeOnLongPress(0)
          changeLongPressChatsList([])
        }
      }}
    >
      <div className={`${longPressed && 'flex'}`}>
        <div
          ref={chatsRef}
          className={`${longPressed && 'longPress flex w-[calc(100%-48px)]'}`}
          onMouseDownCapture={() => {
            const longPress = conversation || 'piazza'
            changeLongPressChat(longPress)
            if (longPressChatsList.length) {
              changeLongPressChatsList([...longPressChatsList, longPress])
            } else {
              changeLongPressChatsList([longPress])
            }
          }}
          onTouchStartCapture={() => {
            const longPress = conversation || 'piazza'
            changeLongPressChat(longPress)
            if (longPressChatsList.length) {
              changeLongPressChatsList([...longPressChatsList, longPress])
            } else {
              changeLongPressChatsList([longPress])
            }
          }}
        >
          <Card
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              bgcolor: colorTwo,
              ':hover': {
                bgcolor: colorTwo,
              },
            }}
          >
            <>
              {!onLongPress ? (
                <Link
                  to="/piazza"
                  state={{
                    conversation: conversation,
                    displayName: displayName,
                    userUid: userObj.uid,
                    chattingUid: chattingUid,
                    multiple: multiple,
                  }}
                >
                  <ChatsBoxes
                    chattingUid={chattingUid}
                    userObj={userObj}
                    profileUrl={profileUrl}
                    displayName={displayName}
                    multiple={multiple}
                    clock={clock}
                    message={message}
                  />
                </Link>
              ) : (
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
                  <ChatsBoxes
                    chattingUid={chattingUid}
                    userObj={userObj}
                    profileUrl={profileUrl}
                    displayName={displayName}
                    multiple={multiple}
                    clock={clock}
                    message={message}
                  />
                </div>
              )}
            </>
          </Card>
        </div>
        {longPressed && (
          <ChatsDelete
            userObj={userObj}
            sorted={sorted}
            conversation={conversation}
            changeLongPressChat={changeLongPressChat}
            changeChattings={changeChattings}
          />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Chats
