import useSelectors from 'src/hooks/useSelectors'
import ChattingStacks from './ChattingStacks'
import EmptyChattingStacks from './EmptyChattingStacks'
import { useSortedChattings } from './useSortedChattings'

const MessageStacks = () => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const { chattings, changeChattings, sorted, chattingNone } = useSortedChattings()
  const chattingsArray = navigator.onLine ? chattings : JSON.parse(localStorage.getItem('chattings') || '[]')
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* {navigator.onLine && chattingNone && <EmptyChattingStacks index={index} />} */}
      <ChattingStacks
        chattings={chattingsArray}
        changeChattings={changeChattings}
        sorted={sorted}
      />
    </div>
  )
}

export default MessageStacks
