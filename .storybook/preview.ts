import { Preview, ReactRenderer } from '@storybook/react-vite';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import { withThemeByClassName } from "@storybook/addon-themes";

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
  decorators: [withThemeFromJSXProvider<ReactRenderer>({
    themes: {
      light: lightTheme,
      dark: darkTheme,
      bright: lightTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }), withThemeByClassName({
      themes: {
          // nameOfTheme: 'classNameForTheme',
          light: '',
          dark: 'dark',
      },
      defaultTheme: 'light',
  })],
};

export default preview;
