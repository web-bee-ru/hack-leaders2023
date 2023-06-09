import * as React from 'react';
import { formatRelative, formatDistance, subDays, addDays, formatISO, format, setDefaultOptions } from 'date-fns';
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
import { useCallback, useEffect, useMemo, useState } from 'react';

setDefaultOptions({ locale: ru });

export interface EventDescription {
  lastRegisteredDate?: Date;
  meanFixTime?: number;
  daysTo?: number;
}
interface EChartsProps {
  e: E;
  m1: EventDescription;
  m3: EventDescription;
}

export default ({ e, m1, m3 }: EChartsProps) => {
  // @ts-ignore
  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ fontWeight: 600 }}>Прошло с поломки</TableCell>
            <TableCell style={{ fontWeight: 600 }}>Сломается через</TableCell>
            <TableCell style={{ fontWeight: 600 }}>Среднее время ремонта</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
              M1
            </TableCell>
            <TableCell title={m1.lastRegisteredDate ? `Поломка: ${formatISO(m1.lastRegisteredDate)}` : ''}>
              {m1.lastRegisteredDate ? formatDistance(m1.lastRegisteredDate, new Date(), { locale: ru }) : '---'}
            </TableCell>
            <TableCell>
              {m1.daysTo != null ? formatDistance(addDays(new Date(), m1.daysTo), new Date(), { locale: ru }) : '---'}
            </TableCell>
            <TableCell>{m1.meanFixTime}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {/* @TODO: тут должен быть не М3, а список оборудования */}
            <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
              M3
            </TableCell>
            <TableCell title={m3.lastRegisteredDate ? `Поломка: ${formatISO(m3.lastRegisteredDate)}` : ''}>
              {m3.lastRegisteredDate ? formatDistance(m3.lastRegisteredDate, new Date(), { locale: ru }) : '---'}
            </TableCell>
            <TableCell>
              {m3.daysTo != null ? formatDistance(addDays(new Date(), m3.daysTo), new Date(), { locale: ru }) : '---'}
            </TableCell>
            <TableCell>{m3.meanFixTime}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
