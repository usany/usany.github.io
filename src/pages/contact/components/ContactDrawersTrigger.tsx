import Button from '@mui/material/Button'
import useTexts from 'src/hooks/useTexts'

const ContactDrawersTrigger = () => {
  const {reportList} = useTexts()
  return (
    <Button variant="outlined" form="auth">
      {reportList}
    </Button>
  )
}

export default ContactDrawersTrigger
