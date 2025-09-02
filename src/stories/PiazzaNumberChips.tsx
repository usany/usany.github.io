import { Chip, useTheme } from '@mui/material'

export interface Props {
  label: string
  // mode: PaletteMode
  /** Optional click handler */
  // onClick?: () => void
}

/** Primary UI component for user interaction */
export const PiazzaNumberChips = ({ label, ...props }: Props) => {
  return (
    <Chip color="primary" sx={{ height: '20px' }} label={label} {...props} />
  )
}
