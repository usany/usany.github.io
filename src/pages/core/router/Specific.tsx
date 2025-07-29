import { Clock } from 'lucide-react'
import { useState } from 'react'
import PageTitle from '../pageTitle/PageTitle'

function Specific({ userObj }) {
  const [cardFlipped, setCardFlipped] = useState(false)
  const [onMove, setOnMove] = useState(false)
  return (
    <div>
      <PageTitle icon={<Clock />} title={'앨범'} />
    </div>
  )
}

export default Specific
