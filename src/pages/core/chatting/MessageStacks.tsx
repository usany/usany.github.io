import { User } from 'firebase/auth'
import { useSelectors } from 'src/hooks/useSelectors'
import ChattingStacks from './ChattingStacks'
import EmptyChattingStacks from './EmptyChattingStacks'
import { useSortedChattings } from './useSortedChattings'

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const { chattings, changeChattings, sorted, chattingNone, changeChattingNone } = useSortedChattings({ userObj })
  return (
    <div className="flex flex-col gap-1 w-full">
      {chattingNone && <EmptyChattingStacks index={index} />}
      <ChattingStacks
        userObj={userObj}
        chattings={chattings}
        changeChattings={changeChattings}
        sorted={sorted}
      />
    </div>
  )
}

export default MessageStacks
