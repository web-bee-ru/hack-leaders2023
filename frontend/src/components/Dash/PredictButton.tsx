import * as React from 'react';
import { E } from '@/components/Dash/Dash';
import {Box, CircularProgress, Modal, styled, Typography} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as d from 'date-fns';
import { generateFakeData } from '@/lib/mockGenerator';
import { ApexOptions } from 'apexcharts';
import Button from "@mui/material/Button";
import EChartMain from "@/components/Dash/EChartMain";
import PredictChart, {PredictionChartRow} from "@/components/Dash/PredictChart";
import useSWR from "swr";
import {FormattedTableRow} from "@/components/Dash/EDescriptionFull";
import {formatDateForServer} from "@/lib/utils";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface PredictModalProps {
  e: E;
  tm: FormattedTableRow;
  now: Date;
  m_type: 'm1' | 'm3';
  open: boolean;
  handleClose: () => void;
}
const PredictModal = ({m_type,tm,now,e,handleClose,open}: PredictModalProps) => {
  const loadPrediction = useCallback(async () => {
    const url = `/api/main/prediction-data?date=${formatDateForServer(now)}&machine_id=${e.id}&m_type=${m_type}&column_name=${tm.tmColumnName}`;
    return fetch(url).then(r => r.json());
  }, []);

  const resultPrediction = useSWR('prediction'+e.id+m_type+tm.tmColumnName, loadPrediction);

  useEffect(() => {
    resultPrediction.mutate();
  }, [e, m_type, now, tm.tmColumnName]);

  const predictionData = useMemo<PredictionChartRow[]>(() => {
    if (resultPrediction.isLoading || !resultPrediction.data) return [];
    return resultPrediction.data.map((it: any) => {
      return {
        type: it.type,
        x: new Date(it.dt),
        y: it[tm.tmColumnName],
      } as PredictionChartRow;
    });
  }, [resultPrediction.isLoading, resultPrediction.data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Text in a modal
        </Typography>
        <PredictChart data={predictionData} />
      </Box>
    </Modal>
  )
};

export interface PredictButtonProps {
  text: string;
  e: E;
  tm: FormattedTableRow;
  now: Date;
  m_type: 'm1' | 'm3';
}
export default ({ text, tm, now, e, m_type }: PredictButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title={"Показать прогноз"} arrow placement="left-start">
        <Button size={"small"} variant={"contained"} color={m_type === 'm3' ? "warning" : 'error'} sx={{fontSize: "0.75rem" }} onClick={handleOpen}>{text}</Button>
      </Tooltip>
      {open && <PredictModal open={open} handleClose={handleClose} m_type={m_type} tm={tm} e={e} now={now} />}
    </>
  );
};
