
const ProfileCompaniesTrigger = ({ user, cards, followers, alliesCollection, selection, onClick }) => {
  return (
    <div className='p-5' onClick={onClick}>
      <div>
        {followers ? '팔로워' : '팔로잉'}
      </div>
      <div className='flex justify-center'>
        {alliesCollection.length}명
      </div>
    </div>
  )
}

export default ProfileCompaniesTrigger
