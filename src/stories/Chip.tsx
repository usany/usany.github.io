import {
  Button,
  Chip,
  createTheme,
  // PaletteMode,
  ThemeProvider,
  useTheme,
} from '@mui/material'
import useColors from 'src/hooks/useColors'

export interface ButtonProps {
  mode: string
  label: string
  // mode: PaletteMode
  /** Optional click handler */
  // onClick?: () => void
}

/** Primary UI component for user interaction */
export const Chips = ({ mode, label, ...props }: ButtonProps) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778'
  const height = mode === 'chat' && { height: '20px' }
  const colorSituations = ['chat', 'location', 'specific']
  if (mode === 'chat') {
    return (
      <Chip color="primary" sx={{ height: '20px' }} label={label} {...props} />
    )
  }
  if (mode === 'location') {
    return <Chip color="success" label={label} {...props} />
  }
  if (mode === 'noProcessing') {
    return (
      <Chip
        sx={{ bgcolor: '#7fc4bc', color: 'white' }}
        label={label}
        {...props}
      />
    )
  }
  if (mode === 'processing') {
    return (
      <Chip
        sx={{
          bgcolor: '#e76e50',
          color: 'white',
        }}
        label={label}
        {...props}
      />
    )
  }
  if (mode === 'specific') {
    return (
      <Chip
        size="small"
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
          fontSize: '12px',
        }}
        label={label}
        {...props}
      />
    )
  }
  return (
    <>
      <Chip
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
        }}
        label={label}
        {...props}
      />
    </>
  )
}
