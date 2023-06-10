import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as d from 'date-fns';
import { generateFakeData } from '@/lib/mockGenerator';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface SensorChartProps {
  currentValueData: {
    x: Date;
    y: number;
  }[];
  averageValueData: {
    x: Date;
    y: [number, number];
  }[];
  yQuant5?: number;
  yQuant95?: number;
}
export default ({ currentValueData, averageValueData, yQuant95, yQuant5 }: SensorChartProps) => {
  // console.log({ yQuant95, yQuant5 })
  const options = useMemo<ApexOptions>(() => {
    return {
      chart: {
        height: 350,
        // type: 'line',
        type: 'rangeArea',
        animations: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      colors: ['#ba000d', '#002884', '#adc0e8'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: [0.2, 1, 1],
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
          // min: yQuant5 || undefined,
          // max: yQuant95 || undefined,
        },
      ],
    };
  }, []);

  const series = useMemo(() => {
    // const dataReal = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 20 });
    // const dataAverage = generateFakeData('area', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 5 });
    // const dataPredict = generateFakeData('smooth', d.subMonths(new Date(), 1), new Date(), { averagingCoef: 10 });
    return [
      {
        name: 'average',
        type: 'rangeArea',
        data: averageValueData.map((it) => ({
          x: +it.x,
          y: it.y,
        })),
      },
      {
        name: 'current',
        type: 'line',
        data: currentValueData.map((it) => ({
          x: +it.x,
          y: it.y,
        })),
      },
      // {
      //   name: 'predict',
      //   type: 'line',
      //   data: dataPredict.map((it) => ({
      //     x: +it.date,
      //     y: it.value,
      //   })),
      // },
    ];
  }, [currentValueData]);

  // console.log({currentValueData})
  // console.log(series[0].data[0])

  return (
    <>
      {/*// @ts-ignore либа кривая, там уже висит пр с фиксом, но пока не пролили. */}
      <ReactApexChart series={series} options={options} height={350} type={'rangeArea'} />
    </>
  );
};
