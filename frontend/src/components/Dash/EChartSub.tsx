import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as d from 'date-fns';
import { generateFakeData } from '@/lib/mockGenerator';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'rangeArea',
    animations: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  colors: ['#adc0e8', '#002884', '#ba000d'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: [1, 1, 1],
  },
  stroke: {
    curve: 'straight',
    width: [0, 1, 1],
  },
  legend: {
    show: true,
    inverseOrder: true,
    position: 'bottom',
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter(value: string, timestamp?: number, opts?: any): string | string[] {
        return d.format(new Date(timestamp || 0), 'dd.MM.yyyy');
      },
    },
  },
  yaxis: [
    {
      seriesName: 'First',
      tooltip: {
        enabled: false,
      },
      labels: {
        formatter(val: number, opts?: any): string | string[] {
          return val.toFixed(2);
        },
      },
      min: 0,
      max: 1,
    },
  ],
};

export default () => {
  const series = useMemo(() => {
    const dataReal = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 20 });
    const dataAverage = generateFakeData('area', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 5 });
    const dataPredict = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 10 });
    return [
      {
        name: 'average',
        type: 'rangeArea',
        data: dataAverage.map((it) => ({
          x: +it.date,
          y: it.value,
        })),
      },
      {
        name: 'current',
        type: 'line',
        data: dataReal.map((it) => ({
          x: +it.date,
          y: it.value,
        })),
      },
      {
        name: 'predict',
        type: 'line',
        data: dataPredict.map((it) => ({
          x: +it.date,
          y: it.value,
        })),
      },
    ];
  }, []);

  return (
    <>
      {/*// @ts-ignore либа кривая, там уже висит пр с фиксом, но пока не пролили. */}
      <ReactApexChart series={series} options={options} height={350} type={'rangeArea'} />
    </>
  );
};
