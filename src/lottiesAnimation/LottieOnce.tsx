import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import scroll from './scroll.json'

function LottieOnce() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: scroll,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="flex flex-col justify-center p-[50px]">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  )
}
export default LottieOnce
