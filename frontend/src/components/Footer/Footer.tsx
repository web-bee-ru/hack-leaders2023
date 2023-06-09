import { Box, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box display="flex" justifyContent="center" mb={3}>
      <Button variant="text" color="info" component="a" href="https://web-bee.ru" target="_blank">
        <img style={{ minWidth: '100px', padding: '0px' }} src="/web-bee-logo-black.svg" alt="Web-Bee" />
      </Button>
    </Box>
  );
};

export default Footer;
