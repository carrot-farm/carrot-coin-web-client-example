import { createMuiTheme } from "@material-ui/core/styles";

const ColorTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#fafafa",
      dark: "#616161",
      contrastText: "#000"
    },
    secondary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff"
    },
    white: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff"
    },
    type: "light"
  }
});

export default ColorTheme;
