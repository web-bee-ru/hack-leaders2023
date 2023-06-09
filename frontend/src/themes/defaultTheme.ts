import { createTheme } from '@mui/material';
import Typography from '@/themes/typography';
import CustomShadows from '@/themes/shadows';
import { palette } from '@/themes/palette';

export const defaultTheme = createTheme({
  palette,
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          'padding': 20,
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          background: 'rgb(250, 250, 251)',
        },
      }),
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: 'red',
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          padding: '0 18px 0 0',
          border: 'solid 1px rgba(255,255,255,0.55)',
        },
        input: {
          padding: '8px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
  typography: Typography(`"Grtsk Peta",Arial,sans-serif`) as any,
  shadows: CustomShadows() as any,
});
