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
  const language = Math.random()
  return (
    <div className='flex flex-col justify-center items-center pt-[250px]'>
      <div className='flex flex-col text-5xl'>{language < 0.5 ? '쿠우산' : 'KHUSAN'}</div>
      <Lottie options={defaultOptions} height={200} width={200} />
      {/* <TextRoll className='text-5xl'>KHUSAN</TextRoll> */}
      {/* <div className='flex flex-col items-center'>
      </div> */}
      {/* <div className='flex flex-col items-center'>
        <TextRoll className='text-5xl'>KHUSAN</TextRoll>
      </div> */}
    </div>
  )
}
export default Lotties
