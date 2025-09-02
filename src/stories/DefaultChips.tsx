import { Chip, useTheme } from '@mui/material'

export interface Props {
  label: string
  // mode: PaletteMode
  /** Optional click handler */
  // onClick?: () => void
}

/** Primary UI component for user interaction */
export const DefaultChips = ({ label, ...props }: Props) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778'
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
