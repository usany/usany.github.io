import { useTexts } from "src/hooks"

const ProfilePointsTrigger = ({ cards }) => {
  const {points} = useTexts()
  return (
    <div className='p-5'>
      <div>{points}</div>
      <div className='flex justify-center'>{cards.point}</div>
    </div>
  )
}

export default ProfilePointsTrigger
