import Lottie from 'react-lottie';
// import Lottie from 'lottie-react'
import rain from 'src/assets/Animation.json';
import { TextScramble } from 'src/components/motion-primitives/text-scramble';
// import { TextRoll } from 'src/components/motion-primitives/text-roll';
function LottieLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='fixed top-[50%] left-[50%] right-[50%] z-50'>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  )
}
export default LottieLoading
