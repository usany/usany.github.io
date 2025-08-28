import { Preview, ReactRenderer } from '@storybook/react-vite';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
