import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';

function ContactAddress({ action, label }:
  {
    userObj: {uid: string, displayName: string}
  }
) {
  return (  
    <div className='px-5'>
      <span>
        {action}:&emsp;
      </span>
      <Chip label={label}/>
    </div>
  )
}

export default ContactAddress