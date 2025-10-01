import PiazzaScreenView from './PiazzaScreenView'

interface Props {
  isKeyboardOpen: boolean
  messagesList: []
  handleMessagesList: (newValue: []) => void
  handleChatUid: (newValue: string) => void
  handleChatDisplayName: (newValue: string) => void
}

function PiazzaScreen({
  isKeyboardOpen,
  messagesList,
  handleMessagesList,
  handleChatUid,
  handleChatDisplayName,
}: Props) {
  return (
    <div className={`fixed w-screen bg-light-3 dark:bg-dark-3 flex flex-col ${isKeyboardOpen ? 'bottom-[50px] h-full pt-[120px]' : 'bottom-[110px] h-[60%]'}`}>
      <PiazzaScreenView
        messagesList={messagesList}
        handleMessagesList={handleMessagesList}
        handleChatUid={handleChatUid}
        handleChatDisplayName={handleChatDisplayName}
      />
    </div>
  )
}

export default PiazzaScreen
