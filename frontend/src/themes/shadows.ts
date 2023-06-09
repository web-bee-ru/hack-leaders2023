// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

const greyPrimary = [
  '#ffffff',
  '#fafafa',
  '#f5f5f5',
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#262626',
  '#141414',
  '#000000',
];
const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
const greyConstant = ['#fafafb', '#e6ebf1'];

const grey = [...greyPrimary, ...greyAscent, ...greyConstant];

const greyColors = {
  0: grey[0],
  50: grey[1],
  100: grey[2],
  200: grey[3],
  300: grey[4],
  400: grey[5],
  500: grey[6],
  600: grey[7],
  700: grey[8],
  800: grey[9],
  900: grey[10],
  A50: grey[15],
  A100: grey[11],
  A200: grey[12],
  A400: grey[13],
  A700: grey[14],
  A800: grey[16],
};

const CustomShadows = () => ({
  button: `0 2px #0000000b`,
  text: `0 -1px 0 rgb(0 0 0 / 12%)`,
  z1: `0px 2px 8px ${alpha('#000', 0.15)}`,
  1: '0 1px 4px 1px rgba(0, 65, 203, 0.2)',
  2: '0 4px 16px 1px rgba(0, 65, 203, 0.1)',
  3: '0 4px 16px 1px rgba(0, 65, 203, 0.05)',
  4: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  5: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  6: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  7: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  8: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  9: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
});

export default CustomShadows;
