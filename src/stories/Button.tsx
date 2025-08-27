import { Button, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import useColors from 'src/hooks/useColors';

export interface ButtonProps {
  label: string;
  mode: PaletteMode
  bgcolor: string
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Buttons = ({
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
    <Button
    variant='outlined'
    sx={{
      bgcolor: bgcolor,
      ':hover': {
        bgcolor: bgcolor,
      },
    }}
      {...props}
    >
      {label}
    </Button>
    </ThemeProvider>

  );
};
