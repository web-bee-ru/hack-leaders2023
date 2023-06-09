import { Grid, Box, Paper, styled } from '@mui/material';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import { PropChildren } from '@/types/UtilityProps';
import AppBar from '@/components/AppBar/AppBar';
import Footer from '@/components/Footer/Footer';

const DefaultLayout = ({ children }: PropChildren) => {
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" height={'100%'}>
      <AppBar />
      {/*<Header opeFooter.tsxn={open} handleDrawerToggle={handleDrawerToggle} />*/}
      {/*<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />*/}
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        {/*  <Toolbar />*/}
        {/*  <Breadcrumbs navigation={navigation} title />*/}
        {/*  <Outlet />*/}
        {children}
      </Box>
      <Footer />
    </Grid>
  );
};

export default DefaultLayout;
