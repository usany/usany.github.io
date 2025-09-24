import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSearchParams } from 'react-router-dom'
import { useTexts } from 'src/hooks'
import useLargeMedia from 'src/hooks/useLargeMedia'

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {
  const largeMedia = useLargeMedia()
  const {
    user,
    my,
    ranking,
    name,
    points,
    locationConfirmation,
    location,
    confirmation,
  } = useTexts()
  const [searchParams, setSearchParams] = useSearchParams()

  if (!multiple && searchParams.get('search')) return null
  return (
    <div className="flex truncate justify-center">
      <div className={`flex justify-around w-[1000px]`}>
        {largeMedia ? (
          <div className="flex items-center justify-center w-[100px]">
            {multiple ? user : my} {ranking}
          </div>
        ) : (
          <div className="flex flex-col items-center w-[100px]">
            <div>{multiple ? user : my}</div>
            <div>{ranking}</div>
          </div>
        )}
        <div className="flex items-center">
          <Avatar className={`bg-light-2 dark:bg-dark-2 border border-dashed`}>
            <AvatarImage src={''} />
            <AvatarFallback className="text-xl border-none">?</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center overflow-hidden w-40">
          <div>
            {multiple ? user : my} {name}
          </div>
          <div>{points}</div>
        </div>
        {largeMedia ? (
          <div className="flex justify-center items-center w-[67px]">
            {locationConfirmation}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-[67px]">
            <div>{location}</div>
            <div>{confirmation}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RankingListsTitle
