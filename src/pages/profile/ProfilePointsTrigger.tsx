import { useSelectors } from "src/hooks"

const ProfilePointsTrigger = ({ user, cards, followers, alliesCollection, selection }) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className='p-5'>
      <div>{languages === 'ko' ? '포인트' : 'Points'}</div>
      <div className='flex justify-center'>{cards.point}</div>
    </div>
  )
}

export default ProfilePointsTrigger
