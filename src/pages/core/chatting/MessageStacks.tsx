import { User } from 'firebase/auth'
import { useSortedChattings } from 'src/hooks/useBottomNavigation'
import { useSelectors } from 'src/hooks/useSelectors'
import ChattingStacks from './ChattingStacks'

const EmptyChattingStacks = ({ index }) => {
  const emptyMessages = {
    ko: '진행  메세지가 없습니다',
    en: 'No messages',
  }
  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
        {emptyMessages[index]}
      </div>
    </div>
  )
}

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const { chattings, changeChattings, sorted } = useSortedChattings({ userObj })
  return (
    <div className="flex flex-col gap-1 w-full">
      {!sorted.length && (
        <EmptyChattingStacks index={index} />
      )}
      <ChattingStacks userObj={userObj} chattings={chattings} changeChattings={changeChattings} sorted={sorted} />
    </div>
  )
}

export default MessageStacks

