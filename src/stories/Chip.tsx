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
  label: string
  // mode: PaletteMode
  bgcolor: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
export const Chips = ({ label, ...props }: ButtonProps) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778'

  return (
    <>
      <Chip
        variant="outlined"
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
