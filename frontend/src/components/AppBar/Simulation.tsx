import { Box, Button, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import {useCallback, useContext, useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Tooltip from '@mui/material/Tooltip';
import * as d from 'date-fns';
import { useRouter } from 'next/router';
import {DEFAULT_START_DATE, MAX_DATE, MIN_DATE, SimulationContext} from "@/Providers/SimulationProvider";

const DATE_IN_QUERY_FORMAT = 'yyyy-MM-dd-hh-mm';
const Simulation = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { now, setNow } = useContext(SimulationContext);

  useEffect(() => {
    if (!router.isReady) return;
    const qDate = router.query.simulationStartDate
      ? d.parse(String(router.query.simulationStartDate), DATE_IN_QUERY_FORMAT, new Date())
      : DEFAULT_START_DATE;
    setNow(qDate);
    const autoplay = router.query.autoplay != null;
    if (autoplay) {
      setIsPlaying(true);
    }
  }, [router, setNow, setIsPlaying]);

  const handleManualChange = useCallback(
    (newDate: Date) => {
      router.query.simulationStartDate = d.formatISO(newDate);
      router.replace({
        query: { ...router.query, simulationStartDate: d.format(newDate, DATE_IN_QUERY_FORMAT) },
      });
      setNow(newDate);
    },
    [setNow],
  );

  const processTick = useCallback(() => {
    // @TODO: добавить проверку, чтобы не "протикать" в будущее, к данным, которых у нас нет
    if (!isPlaying) return;
    setNow(d.addHours(now, 50));
  }, [isPlaying, setNow, now]);

  useEffect(() => {
    const interval = setInterval(() => {
      processTick();
    }, 20000);
    return () => clearInterval(interval);
  }, [isPlaying, processTick]);

  return (
    <>
      <DateTimePicker
        views={["year", "month", "day"]}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        value={now}
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

Simulation.getInitialProps = async () => {
}

export default Simulation;
