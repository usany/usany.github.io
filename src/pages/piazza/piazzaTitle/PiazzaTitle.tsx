import { MessagesSquare } from 'lucide-react'
import { useTexts } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import PiazzaSwitch from 'src/pages/piazza/piazzaTitle/piazzaSwitch/PiazzaSwitch'

interface Props {
  displayName: string
}

const PiazzaTitle = ({ displayName }: Props) => {
  const {groupMessaging, privateMessaging} = useTexts()
  const conversation = location.search ? location.search.slice(location.search.indexOf('=') + 1) : 'piazza'
  return (
    <div className='flex w-screen justify-between'>
      <PageTitle
        icon={<MessagesSquare />}
        title={conversation === 'piazza' ? groupMessaging : `${privateMessaging} ${displayName}`} />
      {conversation === 'piazza' &&
        <PiazzaSwitch />
      }
    </div>
  )
}

export default PiazzaTitle
