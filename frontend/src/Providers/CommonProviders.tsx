import { PropChildren } from '@/types/UtilityProps';
import { cssReset } from '@/Css/CssReset';
import { GlobalStyles, Theme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { ruRU } from '@mui/x-date-pickers/locales';
import ModalProvider from '@/Providers/ModalProvider';
import ToastProvider from '@/Providers/ToastProvider';

interface CommonProvidersProps extends PropChildren {
  theme: Theme;
}

const CommonProviders = ({ theme, children }: CommonProvidersProps) => {
  return (
    <LocalizationProvider
      adapterLocale={ru}
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDateFns}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={cssReset} />
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default CommonProviders;
