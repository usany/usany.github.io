import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSelectors, useTexts } from 'src/hooks'
import { dbservice } from 'src/baseApi/serverbase'

const onDelete = async ({ message }) => {
  const data = doc(dbservice, `num/${message.id}`)
  deleteDoc(data)
}
const DeleteButton = ({ message, deleteMessage, decreaseRound }) => {
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
