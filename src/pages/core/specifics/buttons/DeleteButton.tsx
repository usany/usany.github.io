import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { useSelectors, useTexts } from 'src/hooks'
import { useState } from 'react'
import deleteMessage from 'src/pages/core/card/deleteMessage'
import onDelete from './onDelete'

const DeleteButton = ({ message, decreaseRound }) => {
  const {remove, deleted} = useTexts()
  const [removed, setRemoved] = useState(false)

  return (
    <div className="flex justify-center">
      {!removed ?
        <Button
          variant="outlined"
          onClick={() => {
            onDelete(message?.id)
            deleteMessage(message?.id)
            decreaseRound()
            setRemoved(true)
          }}
          startIcon={<DeleteIcon />}
        >
          {remove}
        </Button>
        :
        <Button variant="outlined" disabled>
          {deleted}
        </Button>
      }
    </div>
  )
}

export default DeleteButton
