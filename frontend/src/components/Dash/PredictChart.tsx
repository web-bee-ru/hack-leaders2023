import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as d from 'date-fns';
import { generateFakeData } from '@/lib/mockGenerator';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface PredictionChartRow {
  type: 'predicted' | 'real';
  x: Date;
  y: number;
}
interface PredictionChartProps {
  data: PredictionChartRow[];
}
export default ({ data }: PredictionChartProps) => {
  const series = useMemo(() => {
    const dataReal:PredictionChartRow[] = [];
    const dataPredict:PredictionChartRow[] = [];
    data.forEach(it => {
      if (it.type === 'real') dataReal.push(it);
      else dataPredict.push(it);
    });
    // console.log({ dataReal, dataPredict })
    return [
      {
        seriesName: 'real',
        name: 'real',
        type: 'line',
        data: dataReal.map((it) => [+it.x, it.y]),
      },
      {
        seriesName: 'predict',
        name: 'predict',
        type: 'line',
        data: dataPredict.map((it) => [+it.x, it.y]),
      },
    ];
  }, [data]);

  const options = useMemo<ApexOptions>(() => {
    return {
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
          seriesName: 'real',
          tooltip: {
            // enabled: true,
          },
          labels: {
            formatter(val: number, opts?: any): string | string[] {
              return val.toFixed(2);
            },
          },
          max: Math.max(...series[1].data.map(it => it[1])) * 1.005,
        },
        {
          seriesName: 'predict',
          tooltip: {
            // enabled: true,
          },
          labels: {
            formatter(val: number, opts?: any): string | string[] {
              return val.toFixed(2);
            },
          },
          show: false,
          forceNiceScale: false,
          // @NOTE: rdem
          min: Math.min(...series[1].data.map(it => it[1])),
          max: Math.max(...series[1].data.map(it => it[1])) * 1.005,
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
  }, [series]);

  return (
    <>
      {/*// @ts-ignore либа кривая, там уже висит пр с фиксом, но пока не пролили. */}
      <ReactApexChart series={series} options={options} height={350} type={'line'} />
    </>
  );
};
