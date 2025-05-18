import { AccordionContent } from '@/components/ui/accordion'
import { ReactNode } from 'react'

const AccordionsContentsViews = ({
  value,
}: {
  value: { content: ReactNode }
}) => {
  return (
    <AccordionContent className="text-sm max-w-[1000px]">
      {value.content}
    </AccordionContent>
  )
}

export default AccordionsContentsViews
