import { Button, Card, PaletteMode, useTheme } from '@mui/material'

export interface Props {
  label: string
  mode: PaletteMode
  // bgcolor: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
export const Cards = ({ label, mode, ...props }: Props) => {
  const theme = useTheme()
  let bgcolor
  if (mode === 'colorThree') {
    bgcolor = theme.palette.mode === 'light' ? '#cbd5df' : '#1a202c'
  } else if (mode === 'colorTwo') {
    bgcolor = theme.palette.mode === 'light' ? '#e2e8f0' : '#2d3848'
  } else {
    bgcolor = theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778'
  }
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
