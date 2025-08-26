import { CssBaseline, ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { darkTheme, lightTheme } from "../src/themes.js";

/* snipped for brevity */

export const decorators = [
	withThemeFromJSXProvider({
		themes: {
			light: lightTheme,
			dark: darkTheme,
		},
		defaultTheme: "light",
		Provider: ThemeProvider,
		GlobalStyles: CssBaseline,
	}),
];
