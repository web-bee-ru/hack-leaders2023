import * as React from 'react';
import * as d from 'date-fns';
import { ru } from 'date-fns/locale';
import { E } from '@/components/Dash/Dash';
import {
  Box,
  CircularProgress,
  styled,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {ResultForTableRow} from "@/components/Dash/ETabContent";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Tooltip from "@mui/material/Tooltip";
import HistoryIcon from '@mui/icons-material/History';
import ReportIcon from '@mui/icons-material/Report';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {SimulationContext} from "@/Providers/SimulationProvider";
import PredictButton from "@/components/Dash/PredictButton";

d.setDefaultOptions({ locale: ru });

export interface EventDescription {
  lastRegisteredDate?: Date;
  meanFixTime?: number;
  daysTo?: number;
}
interface EDescProps {
  e: E;
  tableData: ResultForTableRow[];
}

export interface FormattedTableRow {
  tmId: number;
  tmName: string;
  tmColumnName: string;
  lastM1Crash: string;
  lastM3Crash: string;
  nextM1Crash: string;
  nextM3Crash: string;
  avgM1Fix: string;
  avgM3Fix: string;
}
const EMPTY = '---';
const FORMAT = 'yyyy-MM-dd';

export default ({ e, tableData }: EDescProps) => {
  const { now } = useContext(SimulationContext);
  const formattedTableData = useMemo<FormattedTableRow[]>(() => {
    return tableData
      .map(it => {
        const _m1CrashDate = it.nextM1CrashSec != null && it.nextM1CrashSec < 60 * 60 * 24 * 30
            ? d.addSeconds(now, it.nextM1CrashSec)
            : EMPTY;
        const _m3CrashDate = it.nextM3CrashSec != null && it.nextM3CrashSec < 60 * 60 * 24 * 30
            ? d.addSeconds(now, it.nextM3CrashSec)
            : EMPTY;
        return {
          _m1CrashDate, _m3CrashDate,
          tmId: it.tmId,
          tmName: it.tmName,
          tmColumnName: it.tmColumnName,
          lastM1Crash: it.lastM1Crash ? d.formatDistance(d.parseISO(it.lastM1Crash), now, { addSuffix: true }) : EMPTY,
          lastM3Crash: it.lastM3Crash ? d.formatDistance(d.parseISO(it.lastM3Crash), now, { addSuffix: true }) : EMPTY,
          nextM1Crash: _m1CrashDate === EMPTY
            ? EMPTY
            : d.subMinutes(_m1CrashDate, 1) < now
              ? 'Только что'
              : d.formatDistance(_m1CrashDate, now, { includeSeconds: true, addSuffix: true }),
          nextM3Crash: _m3CrashDate === EMPTY
            ? EMPTY
            : d.subMinutes(_m3CrashDate, 1) < now
              ? 'Только что'
              : d.formatDistance(_m3CrashDate, now, { includeSeconds: true, addSuffix: true }),
          avgM1Fix: it.medM1FixSec ? d.formatDistance(0, it.medM1FixSec * 1000, { includeSeconds: true }) : EMPTY,
          avgM3Fix: it.medM3FixSec ? d.formatDistance(0, it.medM3FixSec * 1000, { includeSeconds: true }): EMPTY,
        };

        // formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
      })
      .filter(it => it.nextM1Crash != EMPTY || it.nextM3Crash != EMPTY)
      .sort((a, b) => {
        if (a._m1CrashDate !== EMPTY) {
          if (b._m1CrashDate !== EMPTY) {
            // @ts-ignore
            return a._m1CrashDate - b._m1CrashDate;
          }
          return -1;
        }
        else {
          if (b._m1CrashDate !== EMPTY) {
            return 1;
          }
        }
        // ---
        if (a._m3CrashDate !== EMPTY) {
          if (b._m3CrashDate !== EMPTY) {
            // @ts-ignore
            return a._m3CrashDate - b._m3CrashDate;
          }
          return -1;
        }
        else {
          if (b._m3CrashDate !== EMPTY) {
            return 1;
          }
        }
        return 0;
      });
  }, [tableData]);
  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>Техместо</TableCell>
            <TableCell align={"center"}><Tooltip title={"M3 - ближайшая поломка (прогноз)"}><ReportIcon style={{verticalAlign: 'middle'}} color={"action"} /></Tooltip></TableCell>
            <TableCell align={"center"}><Tooltip title={"M3 - предыдущая поломка"}><HistoryIcon style={{verticalAlign: 'middle'}} color={"action"} /></Tooltip></TableCell>
            <TableCell align={"center"}><Tooltip title={"M3 - среднее время устранения (статистика)"}><HourglassBottomIcon style={{verticalAlign: 'middle'}} color={"action"} /></Tooltip></TableCell>
            <TableCell align={"center"}><Tooltip title={"M1 - ближайшая поломка (прогноз)"}><ReportIcon style={{verticalAlign: 'middle'}} color={"error"} /></Tooltip></TableCell>
            <TableCell align={"center"}><Tooltip title={"M1 - предыдущая поломка"}><HistoryIcon style={{verticalAlign: 'middle'}} color={"error"} /></Tooltip></TableCell>
            <TableCell align={"center"}><Tooltip title={"M1 - среднее время устранения (статистика)"}><HourglassBottomIcon style={{verticalAlign: 'middle'}} color={"error"} /></Tooltip></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedTableData.map(row => (
            <TableRow key={row.tmId} sx={{background: (theme) => row.nextM1Crash !== EMPTY ? '#ffecec' : '#fff4e0'}}>
              <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>{row.tmName}</TableCell>
              <TableCell align={"center"}>
                {row.nextM3Crash === EMPTY ? EMPTY :
                  <PredictButton
                    text={row.nextM3Crash}
                    now={now}
                    e={e}
                    tm={row}
                    m_type={"m3"}
                  />
                }
              </TableCell>
              <TableCell align={"center"}>{row.lastM3Crash}</TableCell>
              <TableCell align={"center"}>{row.avgM3Fix}</TableCell>
              <TableCell align={"center"}>
                {row.nextM1Crash === EMPTY ? EMPTY :
                  <PredictButton
                    text={row.nextM1Crash}
                    now={now}
                    e={e}
                    tm={row}
                    m_type={"m1"}
                  />
                }
              </TableCell>
              <TableCell align={"center"}>{row.lastM1Crash}</TableCell>
              <TableCell align={"center"}>{row.avgM1Fix}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
