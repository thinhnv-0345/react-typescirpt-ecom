import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    dark: {
      50: string
      200: string
      300: string
      400: string
      500: string
      800: string
      700: string
      1000: string
    }
    darkGray: {
      60: string
      1000: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      400: '#e2a60080',
      500: '#e2a400',
      600: '#ce9805'
    },
    dark: {
      50: '#21243d0d',
      200: '#21243d33',
      300: '#21243d4d',
      400: '#21243d66',
      500: '#21243d80',
      800: '#21243dcc',
      700: '#21243db3',
      1000: '#21243d'
    },
    darkGray: {
      60: '#4142470f',
      1000: '#414247'
    }
  }
})
export default theme
