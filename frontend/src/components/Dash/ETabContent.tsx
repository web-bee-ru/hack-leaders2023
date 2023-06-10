import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import ECharts from '@/components/Dash/ECharts';
import EDescriptionFull, { EventDescription } from '@/components/Dash/EDescriptionFull';
import useSWR from "swr";
import {SimulationContext} from "@/Providers/SimulationProvider";
import {formatDateForServer} from "@/lib/utils";
import SensorCharts from "@/components/Dash/SensorCharts";

interface ETabContentProps {
  e: E;
}

export interface ResultForTableRow {
  tmId: number;
  tmName: string;
  tmColumnName: string;
  lastM1Crash: string | null;
  lastM3Crash: string | null;
  nextM1CrashSec: number | null;
  nextM3CrashSec: number | null;
  avgM1FixSec: number | null;
  avgM3FixSec: number | null;
  medM1FixSec: number | null;
  medM3FixSec: number | null;
}

export default ({ e }: ETabContentProps) => {
  const { now } = useContext(SimulationContext);

  const loadTableData = useCallback(async () => {
    const url = `/api/main/tms-for-table?date=${formatDateForServer(now)}&machine_id=${e.id}`;
    return fetch(url).then(r => r.json());
  }, [e, now]);

  const resultForTable = useSWR('tms-for-table'+e.id, loadTableData);

  useEffect(() => {
    resultForTable.mutate();
  }, [now, e]);

  const isLoading = useMemo<boolean>(() => {
    return resultForTable.isLoading;
  }, [resultForTable.isLoading]);

  const tableData = useMemo<ResultForTableRow[]>(() => {
    if (resultForTable.isLoading || !resultForTable.data) return [];
    return resultForTable.data;
  }, [resultForTable.isLoading, resultForTable.data]);

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
          <EDescriptionFull e={e} tableData={tableData} />
          {/*@TODO*/}
          <SensorCharts e={e} now={now} />
          {/*<ECharts e={e} />*/}
        </>
      )}
    </>
  );
};
