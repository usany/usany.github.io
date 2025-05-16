
const ProfileDrawersEmptyCompanies = ({ user, followers, alliesCollection }) => {

  return (
    <div className='flex justify-center'>
      <div className='rounded shadow-md bg-light-1 dark:bg-dark-1 p-5'>
        {followers ? '팔로워가' : '팔로잉이'} 없습니다
      </div>
    </div>
  );
}

export default ProfileDrawersEmptyCompanies
