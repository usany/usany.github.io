import { createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import useCardsBackground from './useCardsBackground';

const useColors = () => {
  const theme = useSelector((state) => state.theme)
  const color = theme === 'dark' ? '#2d3848' : '#e2e8f0'
  const { colorOne, colorTwo, colorThree } = useCardsBackground()
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiCardContent: {
        defaultProps: {
          sx: {
            bgcolor: colorThree,
            ":hover": {
              bgcolor: colorThree
            }
          },
        },
      },
      MuiButton: {
        defaultProps: {
          sx: {
            bgcolor: colorTwo,
            ":hover": {
              bgcolor: colorTwo
            }
          },
        },
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            bgcolor: colorTwo,
          },
        },
      },
      MuiChip: {
        defaultProps: {
          sx: {
            bgcolor: colorTwo,
            ":hover": {
              bgcolor: colorTwo
            }
          },
        },
      },
    }
  })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return ({ lightTheme, darkTheme })
}
export default useColors
