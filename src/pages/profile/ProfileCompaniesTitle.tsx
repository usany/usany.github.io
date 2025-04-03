const ProfileCompaniesTitle = ({ user, cards, followers, alliesCollection, selection }) => {
  return (
    <div className='flex justify-center'>{user.displayName}의 {followers ? '팔로워' : '팔로잉'}</div>
  )
}

export default ProfileCompaniesTitle
