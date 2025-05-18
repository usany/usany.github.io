import { ReactNode } from 'react'

interface Props {
  value: {
    id: string
    item: string
    onClick: () => void
    content: ReactNode
  }
  index: number
}
function AccordionsContents({ content, index }) {
  return (
    <div className={`flex justify-center ${index && 'px-5'}`}>
      {!index ? <div className="w-[1000px]">{content}</div> : <>{content}</>}
    </div>
  )
}

export default AccordionsContents
