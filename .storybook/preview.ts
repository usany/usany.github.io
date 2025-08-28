import { Preview, Renderer } from '@storybook/react';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../src/themes';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider<Renderer>({
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
