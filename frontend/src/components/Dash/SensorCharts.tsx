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
import {formatDateForServer} from "@/lib/utils";
import useSWR from "swr";
import {ResultForTableRow} from "@/components/Dash/ETabContent";
import SensorChart, {SensorChartProps} from "@/components/Dash/SensorChart";
import SENSOR_QUANTILES from '@/consts/sensor_quantiles.json';

interface EChartsProps {
  e: E;
  now: Date;
}

interface Sensor {
  id: number;
  display_name: string;
  model_column_name: string;
}

interface CardedSubChartProps extends SensorChartProps {
  item: Sensor;
}

const CardedSubChart = ({ item, currentValueData, averageValueData, yQuant5, yQuant95 }: CardedSubChartProps) => {
  return (
    <Card>
      <CardHeader
        title={item.display_name}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <SensorChart currentValueData={currentValueData} averageValueData={averageValueData} yQuant5={yQuant5} yQuant95={yQuant95} />
      </CardContent>
    </Card>
  );
};

export default ({ e, now }: EChartsProps) => {
  const loadSensors = useCallback(async () => {
    const url = `/api/main/sensors`;
    return fetch(url).then(r => r.json());
  }, []);

  const resultSensors = useSWR('sensors'+e.id, loadSensors);

  useEffect(() => {
    resultSensors.mutate();
  }, []);

  const sensors = useMemo<Sensor[]>(() => {
    if (resultSensors.isLoading || !resultSensors.data) return [];
    return resultSensors.data;
  }, [resultSensors.isLoading, resultSensors.data]);



  const loadSensorsData = useCallback(async () => {
    const url = `/api/main/sensors-data?date=${formatDateForServer(now)}&machine_id=${e.id}`;
    return fetch(url).then(r => r.json());
  }, [now, e]);

  const resultSensorsData = useSWR('sensors-data'+e.id, loadSensorsData);

  useEffect(() => {
    resultSensorsData.mutate();
  }, [now, e]);

  const sensorsData = useMemo<CardedSubChartProps[]>(() => {
    if (resultSensors.isLoading || !resultSensors.data || resultSensorsData.isLoading || !resultSensorsData.data) return [];
    return sensors.map(sensor => {
      const sensorQuants = SENSOR_QUANTILES.filter(it => {
        // 5% | 25% | 40% | 50% | 60% | 75% | 95% | mean | std
        return it.machine_name === e.name && it.sensor_name === sensor.display_name
      });
      const sensorQuant25 = sensorQuants.filter(it => it.quantile === '25%')[0];
      const sensorQuant75 = sensorQuants.filter(it => it.quantile === '75%')[0];
      const sensorQuant5 = sensorQuants.filter(it => it.quantile === '5%')[0];
      const sensorQuant95 = sensorQuants.filter(it => it.quantile === '95%')[0];
      return {
        item: sensor,
        currentValueData: resultSensorsData.data.map((it: any) => {
          return {
            x: new Date(it.dt),
            y: it[sensor.model_column_name],
          };
        }),
        averageValueData: resultSensorsData.data.map((it: any) => {
          return {
            x: new Date(it.dt),
            y: [sensorQuant25.value, sensorQuant75.value],
          };
        }),
        yQuant5: sensorQuant5.value,
        yQuant95: sensorQuant95.value,
      };
    });
  }, [sensors, resultSensors.isLoading, resultSensors.data, resultSensorsData.isLoading, resultSensorsData.data]);

  // @TODO: прелоадер забыли...
  const isLoading = useMemo<boolean>(() => {
    return resultSensors.isLoading;
  }, [resultSensors.isLoading]);

  return (
    <>
      <Grid2 container spacing={2} marginBottom={2}>
        {sensorsData.map((it) => (
          <Grid2 key={it.item.id} xs={6}>
            <CardedSubChart {...it} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
