import { Grid, Box, Paper, styled } from '@mui/material';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import { PropChildren } from '@/types/UtilityProps';
import AppBar from '@/components/AppBar/AppBar';
import Footer from '@/components/Footer/Footer';
import {DEFAULT_START_DATE, SimulationContext} from "@/Providers/SimulationProvider";
import {useState} from "react";
import {useRouter} from "next/router";

const DefaultLayout = ({ children }: PropChildren) => {
  const router = useRouter();
  const [date, setDate] = useState<Date>(DEFAULT_START_DATE);

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" height={'100%'}>
      <SimulationContext.Provider value={{ now: date, setNow: setDate }}>
        <AppBar />
        {/*<Header opeFooter.tsxn={open} handleDrawerToggle={handleDrawerToggle} />*/}
        {/*<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />*/}
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          {/*  <Toolbar />*/}
          {/*  <Breadcrumbs navigation={navigation} title />*/}
          {/*  <Outlet />*/}
          {router.isReady && children}
        </Box>
        <Footer />
      </SimulationContext.Provider>
    </Grid>
  );
};

export default DefaultLayout;
