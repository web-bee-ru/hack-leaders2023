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
    type: 'line',
    animations: {
      enabled: false,
    },
  },
  colors: ['#002884', '#ba000d'],
  stroke: {
    width: [2, 1],
    // curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      formatter(value: string, timestamp?: number, opts?: any): string | string[] {
        return d.format(new Date(value), 'dd.MM.yyyy');
      },
    },
  },
  yaxis: [
    {
      seriesName: 'First',
      tooltip: {
        // enabled: true,
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
  legend: {
    position: 'top',
    width: 128,
  },
  tooltip: {
    enabled: false,
  },
};

export default () => {
  const series = useMemo(() => {
    const dataReal = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 20 });
    const dataPredict = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 3 });
    return [
      {
        name: 'real',
        type: 'line',
        data: dataReal.map((it) => [+it.date, it.value]),
      },
      {
        name: 'predict',
        type: 'line',
        data: dataPredict.map((it) => [+it.date, it.value]),
      },
    ];
  }, []);

  return (
    <>
      {/*// @ts-ignore либа кривая, там уже висит пр с фиксом, но пока не пролили. */}
      <ReactApexChart series={series} options={options} height={350} type={'line'} />
    </>
  );
};
