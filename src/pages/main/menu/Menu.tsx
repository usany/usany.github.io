import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import LottieRaining from 'src/lottiesAnimation/LottieRaining'

function Menu() {
  const { myStatus } = useTexts()
  return (
    <div className="flex justify-center flex-col pb-5">
      <PageTitle title={myStatus} />
      <Accordions />
      <LottieRaining />
    </div>
  )
}

export default Menu
