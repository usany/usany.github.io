import { Dock } from 'lucide-react'
import { ReactNode, useRef } from 'react'
import { AnimatedGroup } from 'src/components/motion-primitives/animated-group'
import { AnimatedNumber } from 'src/components/motion-primitives/animated-number'
import { ScrollProgress } from 'src/components/motion-primitives/scroll-progress'
import { TextLoop } from 'src/components/motion-primitives/text-loop'
import { TextScramble } from 'src/components/motion-primitives/text-scramble'

interface Props {
  icon?: ReactNode
  title: string
}

const PageTitle = ({ icon, title }: Props) => {
  const scrollRef = useRef()
  return (
    <div className="flex text-2xl p-5 gap-5 items-center">
      {icon}
      {title}
      <Dock>practice</Dock>
      <AnimatedGroup>practice</AnimatedGroup>
      <AnimatedNumber value={1} />
      <ScrollProgress containerRef={scrollRef.current}/>
      <TextLoop>
        <>practice</>
        <>practice</>
      </TextLoop>
      <TextScramble>practice</TextScramble>
    </div>
  )
}

export default PageTitle
