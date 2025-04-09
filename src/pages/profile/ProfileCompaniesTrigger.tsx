import { useSelectors } from "src/hooks/useSelectors"

const follower = {
  ko: '팔로워',
  en: 'followers'
}
const following = {
  ko: '팔로잉',
  en: 'followings'
}
const ProfileCompaniesTrigger = ({ user, cards, followers, alliesCollection, selection, onClick }) => {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div className='p-5' onClick={onClick}>
      <div>
        {followers ? follower[index] : following[index]}
      </div>
      <div className='flex justify-center'>
        {alliesCollection.length}{languages === 'ko' && '명'}
      </div>
    </div>
  )
}

export default ProfileCompaniesTrigger
