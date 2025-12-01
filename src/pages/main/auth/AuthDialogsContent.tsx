import { useRef, useState } from 'react'
import useTexts from 'src/hooks/useTexts'
import AuthForm from 'src/pages/main/auth/AuthForm'
import AuthMethods from './AuthMethods'
import Playlist from 'src/pages/core/Playlist'
import { ScrollProgress } from 'src/components/motion-primitives/scroll-progress'

function AuthDialogsContent() {
  const [agreed, setAgreed] = useState(false)
  const changeAgreed = () => {
    setAgreed(!agreed)
  }
  const [progress, setProgress] = useState(false)
  const {
    onlyTakesOneMinuteToRegisterAccount,
    playlistReadyForYouToGetRidOfBoredom,
  } = useTexts()
  const docRef = useRef(null)
const changeProgress = () => {
  setProgress(!progress)
}
  return (
    <div ref={docRef} className='h-full overflow-auto'>
      {/* {progress && <ScrollProgress
        containerRef={docRef}
        className="fixed top-5 bg-[#0090FF]"
      />} */}
      <div className="flex flex-col p-3">
        {onlyTakesOneMinuteToRegisterAccount}
        {/* {playlistReadyForYouToGetRidOfBoredom} */}
      </div>
      {/* <div className="flex justify-center pt-3">
        <Playlist />
      </div> */}
      <AuthMethods agreed={agreed} changeAgreed={changeAgreed} changeProgress={changeProgress} />
      <AuthForm signIn={false} agreed={agreed} />
      {/* {progress && (
        <div className="pointer-events-none absolute left-0 top-0 w-full">
          <ScrollProgress
            containerRef={docRef}
            className="fixed top-5 bg-[#0090FF]"
          />
        </div>
      )} */}
    </div>
  )
}

export default AuthDialogsContent
