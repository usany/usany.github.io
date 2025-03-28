import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deleteDoc } from 'firebase/firestore'
import specificProcess from './specificProcess'

const onDelete = async ({ message }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  deleteDoc(data)
}
const DeleteButton = ({ message, deleteMessage, decreaseRound }) => {
  return (
    <div className="flex justify-center">
      <Button
        variant="outlined"
        onClick={() => {
          onDelete({ message: message })
          deleteMessage()
          decreaseRound()
        }}
        startIcon={<DeleteIcon />}
      >
        지우기
      </Button>
    </div>
  )
}

export default DeleteButton
