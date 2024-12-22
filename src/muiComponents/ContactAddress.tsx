import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';

interface Props {
  action: string,
  label: string | null
}

function ContactAddress({ action, label }: Props) {
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