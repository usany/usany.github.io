// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AccordionContent } from '@radix-ui/react-accordion'
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

function AccordionsContents({ value, index }: Props) {
  return (
    <div className={`flex justify-center ${index && 'px-5'}`}>
      {!index ? (
        <div className="w-[1000px]">
          <AccordionContent className="text-sm max-w-[1000px]">
            {value.content}
          </AccordionContent>
        </div>
      ) : (
        <AccordionContent className="text-sm max-w-[1000px]">
          {value.content}
        </AccordionContent>
      )}
    </div>
  )
}

export default AccordionsContents
