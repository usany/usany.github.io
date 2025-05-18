import { ReactNode } from 'react'
import AccordionsContentsViews from './AccordionsContentsViews'

interface Props {
  content: ReactNode
  index: number
}
function AccordionsContents({ content, index }: Props) {
  return (
    <div className={`flex justify-center ${index && 'px-5'}`}>
      {!index ? (
        <div className="w-[1000px]">
          <AccordionsContentsViews content={content} />
        </div>
      ) : (
        <AccordionsContentsViews content={content} />
      )}
    </div>
  )
}

export default AccordionsContents
