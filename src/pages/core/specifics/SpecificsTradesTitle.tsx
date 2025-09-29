import { DocumentData } from "firebase/firestore"


interface Props {
  message: DocumentData
  connectedUser: object
  isCreator: boolean
}
function SpecificsTradesTitle({ message, connectedUser, isCreator }: Props) {
  const displayName = isCreator ? message.displayName : connectedUser.displayName
  return (
    <>{displayName}</>
  )
}

export default SpecificsTradesTitle
