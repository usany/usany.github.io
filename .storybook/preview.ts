import { CssBaseline, ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

/* snipped for brevity */

export const decorators = [
	withThemeFromJSXProvider({
		defaultTheme: "light",
		Provider: ThemeProvider,
		GlobalStyles: CssBaseline,
	}),
];
