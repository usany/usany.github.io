import { useTexts } from 'src/hooks'

const EmptyCard = () => {
  const {empty} = useTexts()
  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
        {empty}
      </div>
    </div>
  )
}

export default EmptyCard
