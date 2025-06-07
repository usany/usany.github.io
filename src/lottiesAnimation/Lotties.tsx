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
    <div className='flex flex-col justify-center p-[50px]'>
      {/* <div className='flex flex-col items-center'>
        <TextRoll className='text-5xl'>쿠우산</TextRoll>
      </div> */}
      <Lottie options={defaultOptions} height={400} width={400} />
      <div className='flex flex-col items-center'>
        <TextRoll className='text-5xl'>쿠우산</TextRoll>
      </div>
    </div>
    // <Lottie animationData={rain} />
  )
}
export default Lotties
