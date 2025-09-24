import { ReactNode } from 'react'
import { AccordionContent } from 'src/components/ui/accordion'

interface Props {
  content: ReactNode
  index: number
}
function AccordionsContents({ content, index }: Props) {
  return (
    <div className={`flex justify-center ${index && 'px-5'}`}>
      {!index ? (
        <div className="w-[1000px]">
          <AccordionContent className="text-sm max-w-[1000px]">
            {content}
          </AccordionContent>
        </div>
      ) : (
        <AccordionContent className="text-sm max-w-[1000px]">
          {content}
        </AccordionContent>
      )}
    </div>
  )
}

export default AccordionsContents
