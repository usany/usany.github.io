import { Button, Chip, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import useColors from 'src/hooks/useColors';

export interface ButtonProps {
  label: string;
  mode: PaletteMode
  bgcolor: string
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Chips = ({
  mode,
  bgcolor,
  label,
  ...props
}: ButtonProps) => {
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Chip
        variant='outlined'
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
        }}
        label={label}
        {...props}
      />
    </ThemeProvider>
  );
};
