import Lottie from 'react-lottie';
// import Lottie from 'lottie-react'
import rain from './loading.json';
// import { TextRoll } from 'src/components/motion-primitives/text-roll';
function LottieRaining() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Lottie options={defaultOptions} height={200} width={200} />
  )
}
export default LottieRaining
