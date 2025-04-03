const ProfilePointsTitle = ({ user, cards, followers, alliesCollection, selection }) => {
  return (
    <div className='flex justify-center'>{`${user.displayName}의 포인트 적립 영수증`}</div>
  )
}

export default ProfilePointsTitle
