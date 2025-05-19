import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import ChattingStacks from 'src/pages/core/chatting/ChattingStacks'

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  const [longPressChat, setLongPressChat] = useState(null)
  const [longPressChatsList, setLongPressChatsList] = useState([])
  const [onLongPress, setOnLongPress] = useState(0)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressChat(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressChat) {
      setOnLongPress(0)
    }
  }, [longPressChat])

  return (
    <>
      <ChattingStacks
        userObj={userObj}
        longPressChat={longPressChat}
        longPressChatsList={longPressChatsList}
        changeLongPressChat={(newValue) => setLongPressChat(newValue)}
        changeLongPressChatsList={(newValue) => setLongPressChatsList(newValue)}
        onLongPress={onLongPress}
        changeOnLongPress={(newValue) => setOnLongPress(newValue)}
      />
    </>
  )
}

export default MessageStacks
