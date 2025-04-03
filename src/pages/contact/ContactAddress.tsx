import { Chip } from '@mui/material';

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
      <Chip label={label} />
      {/* <Chips label={label} onClick={null} /> */}
    </div>
  )
}

export default ContactAddress
