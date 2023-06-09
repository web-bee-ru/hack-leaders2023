// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

import { palette } from '@/themes/palette';

const Typography = (fontFamily: string) => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: '2.375rem',
    lineHeight: 1.21,
    color: palette.primary.main,
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    lineHeight: 1.27,
    color: palette.primary.main,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.33,
    color: palette.primary.main,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    color: palette.primary.main,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
    color: palette.primary.main,
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    color: palette.primary.main,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    color: palette.primary.main,
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.57,
    color: palette.primary.main,
  },
  body2: {
    fontSize: '0.75rem',
    lineHeight: 1.66,
    color: palette.primary.main,
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.57,
    color: palette.primary.main,
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.66,
    color: palette.primary.main,
  },
  overline: {
    lineHeight: 1.66,
  },
  button: {
    textTransform: 'capitalize',
  },
});

export default Typography;
