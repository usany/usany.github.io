import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deleteDoc } from 'firebase/firestore'
import { useSelectors, useTexts } from 'src/hooks'
import specificProcess from './specificProcess'

const onDelete = async ({ message }) => {
  const { data } = await specificProcess({ message: message })
  deleteDoc(data)
}
const DeleteButton = ({ message, deleteMessage, decreaseRound }) => {
  const languages = useSelectors((state) => state.languages.value)
  const {remove} = useTexts()
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
        {remove}
      </Button>
    </div>
  )
}

export default DeleteButton
