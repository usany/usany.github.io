import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import PiazzaSwitch from 'src/pages/piazza/piazzaTitle/piazzaSwitch/PiazzaSwitch'

interface Props {
  multiple: boolean
  displayName: string
}

const PiazzaTitle = ({ multiple, displayName }: Props) => {
  return (
    <div className='flex w-screen justify-between'>
      <PageTitle title={multiple ? '단체 대화' : `개인 대화 ${displayName}`} />
      {multiple &&
        <div className='flex w-2/3 justify-end px-5 pt-5'>
          <PiazzaSwitch />
        </div>
      }
    </div>
  )
}

export default PiazzaTitle
