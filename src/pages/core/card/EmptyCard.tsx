import { useSelectors } from 'src/hooks'

const emptyCards = {
  ko: '진행 카드가 없습니다',
  en: 'No cards',
}
const EmptyCard = () => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
        {emptyCards[index]}
      </div>
    </div>
  )
}

export default EmptyCard
