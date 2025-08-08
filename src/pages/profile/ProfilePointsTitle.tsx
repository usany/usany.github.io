import useTexts from 'src/useTexts'

const ProfilePointsTitle = ({
  user,
  cards,
  followers,
  alliesCollection,
  selection,
}) => {
  const { pointReceipt } = useTexts()
  return (
    <div className="flex justify-center">{`${user.displayName} ${pointReceipt}`}</div>
  )
}

export default ProfilePointsTitle
