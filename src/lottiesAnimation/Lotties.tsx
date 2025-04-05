import Lottie from 'react-lottie';
// import Lottie from 'lottie-react'
import rain from 'src/assets/Animation.json';
import { TextRoll } from 'src/components/motion-primitives/text-roll';

function Lotties() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center'>
        <TextRoll className='text-5xl'>umbrellas</TextRoll>
      </div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
    // <Lottie animationData={rain} />
  )
}
export default Lotties
