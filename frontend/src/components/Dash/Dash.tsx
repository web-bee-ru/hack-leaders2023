import {
  Box,
  Button,
  styled,
  Tab,
  Tabs,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper, CircularProgress,
} from '@mui/material';
import useModal from '@/hooks/useModal';
import DrawerExample from '@/components/DrawerExample';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { ToastContext } from '@/Providers/ToastProvider';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import DefaultDatePicker from '@/components/UI/DefaultDatePicker';
import DefaultMenu, { MenuOptionProps } from '@/components/UI/DefaultMenu';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import ETab from '@/components/Dash/ETab';
import ETabContent from '@/components/Dash/ETabContent';
import useSWR from "swr";
import {SimulationContext} from "@/Providers/SimulationProvider";
import {formatDateForServer} from "@/lib/utils";

export interface E {
  id: number;
  name: string;
  daysToM1: number | null;
  daysToM3: number | null;
}

const Index = () => {
  const [active, setActive] = React.useState<E>();
  const { now } = useContext(SimulationContext);

  const result = useSWR('machines-for-tabs', async () => {
    const url = `/api/main/machines-for-tabs?date=${formatDateForServer(now)}`;
    return fetch(url).then(r => r.json());
  }, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    result.mutate();
  }, [now]);

  // console.log({asd: result})

  const machines = useMemo<E[]>(() => {
    if (!result.data) return [];
    return result.data.map((it: any) => {
      const daysToM1 = it.secondsToM1 / 60 / 60 / 24;
      const daysToM3 = it.secondsToM3 / 60 / 60 / 24;
      const e: E = {
        id: it.id,
        name: it.display_name,
        daysToM1: daysToM1 > 30 ? null : daysToM1,
        daysToM3: daysToM3 > 30 ? null : daysToM3,
      };
      return e;
    });
  }, [result.data]);

  return (
    <Box style={{ height: '100%' }}>
      <Paper elevation={1} sx={{ display: 'flex', minHeight: '100%' }}>
        {result.data == null ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress sx={{ margin: 'auto', marginTop: 6 }} />
          </Box>) : (<>
          <List style={{ minWidth: '250px', padding: 0, borderRight: 'solid 1px rgb(230, 235, 241)' }}>
            {machines.map((it, idx) => (
              <ETab e={it} key={it.id} selected={active ? it.id === active.id : idx === 0} onClick={() => setActive(it)} />
            ))}
          </List>
          <Container style={{ flex: 2 }}>
            <ETabContent key={(active || machines[0]).id} e={active || machines[0]} />
          </Container>
        </>)}
      </Paper>
    </Box>
  );
};

export default Index;
