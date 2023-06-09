import { Box, Button, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCallback, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Tooltip from '@mui/material/Tooltip';
import * as d from 'date-fns';
import { useRouter } from 'next/router';

const DATE_IN_QUERY_FORMAT = 'yyyy-MM-dd-hh-mm';
const Simulation = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const qDate = router.query.simulationStartDate
      ? d.parse(String(router.query.simulationStartDate), DATE_IN_QUERY_FORMAT, new Date())
      : new Date();
    setDate(qDate);
    const autoplay = router.query.autoplay != null;
    if (autoplay) {
      setIsPlaying(true);
    }
  }, [router, setDate, setIsPlaying]);

  const handleManualChange = useCallback(
    (newDate: Date) => {
      router.query.simulationStartDate = d.formatISO(newDate);
      router.replace({
        query: { ...router.query, simulationStartDate: d.format(newDate, DATE_IN_QUERY_FORMAT) },
      });
      setDate(newDate);
    },
    [setDate],
  );

  const processTick = useCallback(() => {
    // @TODO: добавить проверку, чтобы не "протикать" в будущее, к данным, которых у нас нет
    if (!isPlaying) return;
    setDate((date) => d.addHours(date, 3));
  }, [isPlaying, setDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      processTick();
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <DateTimePicker
        disableFuture={true}
        minDate={new Date('2021-01-01')}
        value={date}
        onChange={(v) => handleManualChange(v || new Date())}
        sx={{ marginLeft: 'auto', color: 'red', maxWidth: '180px' }}
      />
      {isPlaying ? (
        <Tooltip title="Остановить симуляцию">
          <IconButton sx={{ marginRight: 2 }} onClick={() => setIsPlaying(false)}>
            <PauseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Запустить симуляцию">
          <IconButton sx={{ marginRight: 2 }} onClick={() => setIsPlaying(true)}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default Simulation;
