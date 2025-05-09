import { createTheme } from "@mui/material";
import { blue, green, indigo, orange, purple, red, cyan } from "@mui/material/colors";
import { ptBR } from "@mui/x-date-pickers/locales";
import { ptBR as corePtBR } from '@mui/material/locale';

declare module '@mui/material/styles' {
    interface Theme {
        textColor: {
            secondary: string;
            backgroundInput: string;
        },
        iconButtonTheme: {
            bgCyan: string,
            purpleMain: string,
            bgPurple: string,
            bgPurpleHover: string
            bgBlue: string,
            bgBlueHover: string,
            bgDarkBlue: string,
            bgDarkBlueHover: string,
            bgOrange: string,
            bgOrangeHover: string,
            bgDarkOrange: string,
            bgDarkOrangeHover: string,
            bgGreen: string,
            bgGreenHover: string,
            bgDarkGreen: string,
            bgDarkGreenHover: string,
            bgRed: string,
            bgRedHover: string,
            bgDarkRed: string,
            bgDarkRedHover?: string,
            bgIndigo: string,
            bgIndigoHover: string,
        },
    }
    interface ThemeOptions {
        textColor?: {
            secondary?: string;
            backgroundInput?: string;
        },
        iconButtonTheme?: {
            bgCyan?: string,
            bgPurple?: string,
            purpleMain?: string,
            bgPurpleHover?: string,
            bgBlue?: string,
            bgBlueHover?: string,
            bgDarkBlue?: string,
            bgDarkBlueHover?: string,
            bgOrange?: string,
            bgOrangeHover?: string,
            bgDarkOrange?: string,
            bgDarkOrangeHover?: string,
            bgGreen?: string,
            bgGreenHover?: string,
            bgDarkGreen?: string,
            bgDarkGreenHover?: string,
            bgRed?: string,
            bgRedHover?: string,
            bgDarkRed?: string,
            bgDarkRedHover?: string;
            bgIndigo?: string,
            bgIndigoHover?: string,
        }
    }
    interface Palette {
        dark: Palette['primary'];
    }

    interface PaletteOptions {
        dark?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/AppBar' {
    interface AppbarPropsColorOverrides {
        dark: true;
    }
}

const theme = createTheme({
    textColor: {
        secondary: '#191326',
        backgroundInput: '#372f47',
    },
    iconButtonTheme: {
        bgCyan: cyan[500],
        purpleMain: purple[800],
        bgPurple: purple[400],
        bgPurpleHover: purple[800],
        bgBlue: blue[100],
        bgBlueHover: blue[700],
        bgDarkBlue: blue[900],
        bgDarkBlueHover: blue[900],
        bgOrange: orange[100],
        bgOrangeHover: orange[700],
        bgDarkOrange: orange[900],
        bgDarkOrangeHover: orange[900],
        bgGreen: green[100],
        bgGreenHover: green[700],
        bgDarkGreen: green[900],
        bgDarkGreenHover: green[900],
        bgRed: red[200],
        bgRedHover: red[800],
        bgDarkRed: red[500],
        bgDarkRedHover: red[800],
        bgIndigo: indigo[300],
        bgIndigoHover: indigo[700],
    },
    palette: {
        text: {
            primary: '#000',
            secondary: '#424242',
        },
        primary: {
            main: '#ADD8E6',
        },
        secondary: {
            main: "#FFEB3B",
            contrastText: "#81D4FA"
        },
        background: {
            default: '#E0E0E0',
            paper: '#FFF'
        },
        action: {
            active: "#FF9800",
            disabled: '#524b63',
            hover: "#ADD8E6",
        },
        dark: {
            main: '#000000',
        },
    },
    components: {
        MuiCssBaseline: {
            // styleOverrides: `
            // @font-face {
            //     font-family: 'Payback';
            //     font-style: normal;
            //     font-display: swap;
            //     font-weight: 400;
            //     src: local('Payback'), local('Payback'), url(${Payback}) format('truetype');
            //     unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            // }
            // `
        }
    },
},
    ptBR,
    corePtBR
)

export default theme;
