import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

const AddSnackBar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const vertical = 'top'
  const horizontal = 'center'

  return (
    <Snackbar
      open={isOpen}
      sx={{ paddingBottom: '10%' }}
      message="등록되었습니다"
      anchorOrigin={{ vertical, horizontal }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default AddSnackBar
