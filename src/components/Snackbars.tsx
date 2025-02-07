import { useState } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';

export default function Snackbars() {
  const [open, setOpen] = useState({
    open: false,
    Transition: Fade,
  });
  
  function growTransition(props) {
    return <Grow {...props} />;
  }

  const handleClick = (transition) => {
    setOpen({
      open: true,
      transition
    });
  };
  const handleClose = (
    event, 
  ) => {
    setOpen({
      ...open,
      open: false,
    });
  };
  const action = (
    <div>
      <Button color="primary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div>
      <Button onClick={() => handleClick(growTransition)}>Open Snackbar</Button>
      <Snackbar
        open={open.open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="success"
        action={action}
      />
    </div>
  );
}