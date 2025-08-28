import { Button, Card, useTheme } from '@mui/material'

export interface Props {
  label: string
  // mode: PaletteMode
  // bgcolor: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
export const Cards = ({ label, ...props }: Props) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#e2e8f0' : '#2d3848'
  return (
    <>
      <Card
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
        }}
        {...props}
      >
        {label}
      </Card>
    </>
  )
}
