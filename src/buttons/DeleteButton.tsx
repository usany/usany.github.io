import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deleteDoc } from 'firebase/firestore'
import { useSelectors } from 'src/hooks'
import specificProcess from './specificProcess'

const onDelete = async ({ message }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  deleteDoc(data)
}
const DeleteButton = ({ message, deleteMessage, decreaseRound }) => {
  const languages = useSelectors((state) => state.languages.value)

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
        {languages === 'ko' ?
          '지우기'
          :
          'Delete'
        }
      </Button>
    </div>
  )
}

export default DeleteButton
