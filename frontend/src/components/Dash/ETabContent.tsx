import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ECharts from '@/components/Dash/ECharts';
import EDescriptionFull, { EventDescription } from '@/components/Dash/EDescriptionFull';

interface ETabContentProps {
  e: E;
}

export default ({ e }: ETabContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eDesc, setEDesc] = useState<{ m1: EventDescription; m3: EventDescription }>({ m1: {}, m3: {} });
  const [chartsData, setChartsData] = useState<number[]>();

  const loadChartsData = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => {
      setEDesc({
        m1: {
          daysTo: 12,
          lastRegisteredDate: new Date('01-01-2021'),
          meanFixTime: 123,
        },
        m3: {
          daysTo: 3,
          lastRegisteredDate: new Date('08-13-2021'),
          meanFixTime: 5,
        },
      });
      setChartsData((data) => (data ? [...data, Date.now()] : [Date.now()]));
      setIsLoading(false);
    }, 500);
  }, [e, setIsLoading]);

  useEffect(() => {
    loadChartsData();
  }, [e]);

  return (
    <>
      <Typography variant="h3" paddingTop={2}>
        {e.name}
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{ margin: 'auto', marginTop: 6 }} />
        </Box>
      ) : (
        <>
          <EDescriptionFull e={e} {...eDesc} />
          <ECharts e={e} />
        </>
      )}
    </>
  );
};
