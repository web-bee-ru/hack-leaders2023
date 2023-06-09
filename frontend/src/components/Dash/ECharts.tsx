import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import EChartMain from '@/components/Dash/EChartMain';
import Grid2 from '@mui/material/Unstable_Grid2';
import EChartSub from '@/components/Dash/EChartSub';

interface EChartsProps {
  e: E;
}

// @TODO: это с бэка забирать надо
const subCharts = [
  'Компонент-1',
  'Компонент-2',
  'Компонент-3',
  'Компонент-4',
  'Компонент-5',
  'Компонент-6',
  'Компонент-7',
  'Компонент-8',
  'Компонент-9',
  'Компонент-10',
];

interface CardedSubChartProps {
  item: string;
}
const CardedSubChart = ({ item }: CardedSubChartProps) => {
  const [selected, setSelected] = useState('state');
  const handlePress = (event: React.MouseEvent<HTMLElement>, newSelected: string) => {
    setSelected(newSelected);
  };
  return (
    <Card>
      <CardHeader
        title={`Состояние ${item}`}
        // @NOTE: почему-то мне кажется, что этот функционал (переключалка) будет неудобен. Лучше вывалить все графики сразу
        // action={
        //   (
        //     <ToggleButtonGroup color="primary" value={selected} exclusive onChange={handlePress} aria-label="Platform">
        //       <ToggleButton size={'small'} value={'state'}>
        //         Состояние
        //       </ToggleButton>
        //       <ToggleButton size={'small'} value={'predict'}>
        //         Прогноз
        //       </ToggleButton>
        //     </ToggleButtonGroup>
        //   )
        // }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <EChartSub />
      </CardContent>
    </Card>
  );
};

export default ({ e }: EChartsProps) => {
  return (
    <>
      <Grid2 container spacing={2} marginBottom={2}>
        <Grid2 xs={12}>
          <Card>
            <CardHeader title={'Состояние эксгаустера'} />
            <CardContent sx={{ paddingTop: 0 }}>
              <EChartMain />
            </CardContent>
          </Card>
        </Grid2>
        {subCharts.map((it) => (
          <Grid2 key={it} xs={6}>
            <CardedSubChart item={it} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
