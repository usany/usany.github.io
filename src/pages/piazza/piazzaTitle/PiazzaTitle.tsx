import { MessagesSquare } from 'lucide-react'
import { useSelectors } from 'src/hooks/useSelectors'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import PiazzaSwitch from 'src/pages/piazza/piazzaTitle/piazzaSwitch/PiazzaSwitch'

const piazzaTitles = {
  ko: ['단체 대화', '개인 대화'],
  en: ['Group Messaging', 'Messaging']
}
interface Props {
  multiple: boolean
  displayName: string
}

const PiazzaTitle = ({ multiple, displayName }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div className='flex w-screen justify-between'>
      <PageTitle
        icon={<MessagesSquare />}
        title={multiple ? piazzaTitles[index][0] : `${piazzaTitles[index][1]} ${displayName}`} />
      {multiple &&
        <div className='flex w-1/2 justify-end px-5 pt-5'>
          <PiazzaSwitch />
        </div>
      }
    </div>
  )
}

export default PiazzaTitle
