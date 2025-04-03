const ProfilePointsTrigger = ({ user, cards, followers, alliesCollection, selection }) => {
  return (
    <div className='p-5'>
      <div>포인트</div>
      <div className='flex justify-center'>{cards.point}</div>
    </div>
  )
}

export default ProfilePointsTrigger
