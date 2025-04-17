import { createTheme } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import useCardsBackground from './useCardsBackground'

const useColors = () => {
  const theme = useSelector((state) => state.theme)
  const color = theme === 'dark' ? '#2d3848' : '#e2e8f0'
  const { colorOne, colorTwo, colorThree } = useCardsBackground()
  const common = {
    components: {
      MuiCard: {
        defaultProps: {
          sx: {
            bgcolor: colorThree,
            ':hover': {
              bgcolor: colorThree,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
            ],
          },
        },
      },
      MuiButton: {
        defaultProps: {
          sx: {
            bgcolor: colorTwo,
            ':hover': {
              bgcolor: colorTwo,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
            ],
          },
        },
      },
      MuiChip: {
        defaultProps: {
          sx: {
            bgcolor: colorOne,
            ':hover': {
              bgcolor: colorOne,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorOne' },
                style: {
                  backgroundColor: colorOne,
                },
              },
              {
                props: { className: 'error' },
                style: {
                  backgroundColor: red,
                },
              },
              {
                props: { color: 'success' },
                style: {
                  backgroundColor: green[500],
                },
              },
            ],
          },
        },
      },
    },
  }
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    ...common,
  })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    ...common,
  })

  return { lightTheme, darkTheme }
}
export default useColors
