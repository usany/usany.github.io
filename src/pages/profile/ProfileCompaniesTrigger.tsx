import { useSelectors, useTexts } from 'src/hooks'

const ProfileCompaniesTrigger = ({
  followers,
  alliesCollection,
  onClick,
}) => {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const {follower, following} = useTexts()
  return (
    <div className="p-5" onClick={onClick}>
      <div>{followers ? follower : following}</div>
      <div className="flex justify-center">
        {alliesCollection.length}
        {languages === 'ko' && '명'}
      </div>
    </div>
  )
}

export default ProfileCompaniesTrigger
