import { AccordionTrigger } from '@/components/ui/accordion'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  value: {
    id: string
    item: string
    onClick: () => void
  }
}

function AccordionsTriggers({ value }: Props) {
  return (
    <div className="flex justify-center sticky top-16 z-30 px-5">
      <div className="w-[1000px]">
        <button
          onClick={() => {
            document.getElementById(value.id)?.click()
          }}
          className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
        >
          <div>{value.item}</div>
          <AccordionTrigger
            id={value.id}
            onClick={value.onClick}
          ></AccordionTrigger>
        </button>
      </div>
    </div>
  )
}

export default AccordionsTriggers
