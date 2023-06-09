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
  Paper,
} from '@mui/material';
import useModal from '@/hooks/useModal';
import DrawerExample from '@/components/DrawerExample';
import React, { useContext, useMemo, useState } from 'react';
import { ToastContext } from '@/Providers/ToastProvider';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import DefaultDatePicker from '@/components/UI/DefaultDatePicker';
import DefaultMenu, { MenuOptionProps } from '@/components/UI/DefaultMenu';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import ETab from '@/components/Dash/ETab';
import ETabContent from '@/components/Dash/ETabContent';

export interface E {
  name: string;
  daysToM1: number | null;
  daysToM3: number | null;
}

const Es: E[] = [
  { name: 'Эксгаустер 1', daysToM1: 0, daysToM3: 0 },
  { name: 'Эксгаустер 2', daysToM1: null, daysToM3: 0 },
  { name: 'Эксгаустер 3', daysToM1: 0, daysToM3: null },
  { name: 'Эксгаустер 4', daysToM1: null, daysToM3: null },
  { name: 'Эксгаустер 5', daysToM1: 1, daysToM3: 0 },
  { name: 'Эксгаустер 6', daysToM1: 0, daysToM3: 2 },
  { name: 'Эксгаустер 7', daysToM1: 3, daysToM3: 4 },
  { name: 'Эксгаустер 8', daysToM1: 0, daysToM3: 0 },
  { name: 'Эксгаустер 9', daysToM1: 0, daysToM3: 0 },
];

const Index = () => {
  const [active, setActive] = React.useState(Es[0]);

  // @ts-ignore
  return (
    <Box style={{ height: '100%' }}>
      <Paper elevation={1} sx={{ display: 'flex', minHeight: '100%' }}>
        <List style={{ minWidth: '250px', padding: 0, borderRight: 'solid 1px rgb(230, 235, 241)' }}>
          {Es.map((it) => (
            <ETab e={it} key={it.name} selected={it === active} onClick={() => setActive(it)} />
          ))}
        </List>
        <Container style={{ flex: 2 }}>
          <ETabContent e={active} />
        </Container>
      </Paper>
    </Box>
  );
};

export default Index;
