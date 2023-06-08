import { createTheme } from '@mui/material';

export const baseTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
        sizeLarge: {
          height: 56,
          padding: 20,
        },
        sizeMedium: {
          height: 44,
          padding: 12,
        },
        textSecondary: ({ theme }) => ({
          'color': '#707070',
          '&:hover': {
            background: theme.palette.secondary.dark,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 16px 24px 0px #0000003D',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          transition: '200ms ease',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#eee700',
    },
    secondary: {
      main: '#343434',
    },
    background: {
      default: '#1c1c1c',
      paper: '#272727',
    },
    divider: '#D9D9D914',
  },
});
