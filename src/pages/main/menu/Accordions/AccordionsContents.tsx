import { ReactNode } from 'react'

interface Props {
  content: ReactNode
  index: number
}
function AccordionsContents({ content, index }: Props) {
  return (
    <div className={`flex justify-center ${index && 'px-5'}`}>
      {!index ? <div className="w-[1000px]">{content}</div> : <>{content}</>}
    </div>
  )
}

export default AccordionsContents
