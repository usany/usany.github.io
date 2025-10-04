import { Button, useTheme } from '@mui/material'

export interface ButtonProps {
  label: string
  onClick?: () => void
}

export const DefaultButtons = ({ label, onClick, ...props }: ButtonProps) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#e2e8f0' : '#2d3848'
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: bgcolor,
        ':hover': {
          bgcolor: bgcolor,
        },
      }}
      {...props}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
