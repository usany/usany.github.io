import { User } from 'firebase/auth'


interface Props {
  userObj: User | null
  message: {}
}
function SpecificsTradesTitle({ message, isCreator }: Props) {
  const displayName = isCreator ? message.displayName : message. connectedDisplayName
  return (
    <>{displayName}</>
  )
}

export default SpecificsTradesTitle
