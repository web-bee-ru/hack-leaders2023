import * as React from 'react';
import { E } from './Dash';
import {
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { ListItemButtonProps } from '@mui/material/ListItemButton/ListItemButton';
import {useContext, useEffect, useMemo, useState} from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import {ToastContext} from "@/Providers/ToastProvider";
import Button from "@mui/material/Button";
import * as d from "date-fns";
import {SimulationContext} from "@/Providers/SimulationProvider";

interface ETabProps extends ListItemButtonProps {
  e: E;
}

export default ({ e, ...props }: ETabProps) => {
  const { now } = useContext(SimulationContext);
  const [isFirst, setIsFirst] = useState(true);
  const { successToast, errorToast, infoToast, warningToast } = useContext(ToastContext);
  const theme = useTheme();
  const status = useMemo<'ok' | 'error' | 'warning'>(() => {
    if (e.secondsToM1 != null) return 'error';
    if (e.secondsToM3 != null) return 'warning';
    return 'ok';
  }, [e]);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    if (status === 'error') {
      errorToast(`${e.name} требует срочного обслуживания`);
    }
    else if (status === 'warning') {
      warningToast(`${e.name} требует устранения неисправности`);
    }
    if (status === 'ok') {
      successToast(`${e.name} восстановлен`);
    }

  }, [status]);

  const statusIcon = useMemo(() => {
    if (status === 'error')
      return (
        <Avatar sx={{ bgcolor: theme.palette.error.main }}>
          <DangerousIcon />
        </Avatar>
      );
    if (status === 'warning')
      return (
        <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
          <WarningIcon />
        </Avatar>
      );
    if (status === 'ok')
      return (
        <Avatar sx={{ bgcolor: theme.palette.success.main }}>
          <CheckCircleIcon />
        </Avatar>
      );
  }, [status]);

  const description = useMemo(() => {
    if (status === 'ok')
      return (
        <>
          <StyledDesc variant="body2">Статус: НОРМА</StyledDesc>
          {/* @TODO: если дойдут руки - тут можно реализовать "дней без М1/М3" */}
        </>
      );
    if (status === 'warning')
      return (
        <>
          {Number(e.secondsToM3) < 60 * 60 * 24
            ? (<StyledDesc variant="body2">Статус: НЕИСПРАВНОСТЬ (М3)</StyledDesc>)
            : (<>
              <StyledDesc variant="body2">Статус: ВОЗМОЖНА НЕИСПРАВНОСТЬ</StyledDesc>
              <StyledDesc variant="body2">
                M3 {d.formatDistance(d.addSeconds(now, e.secondsToM3 || 0), now, { addSuffix: true })}
              </StyledDesc>
            </>)
          }
        </>
      );
    if (status === 'error')
      return (
        <>
          {Number(e.secondsToM1) < 60 * 60 * 24
            ? (<StyledDesc variant="body2">Статус: ОТКАЗ (М1)</StyledDesc>)
            : (<>
              <StyledDesc variant="body2">Статус: ВОЗМОЖЕН ОТКАЗ</StyledDesc>
              <StyledDesc variant="body2">
                M1 {d.formatDistance(d.addSeconds(now, e.secondsToM1 || 0), now, { addSuffix: true })}
              </StyledDesc>
            </>)
          }
        </>
      );
  }, [e.secondsToM1, e.secondsToM3, status]);

  return (
    <ListItemButton {...props}>
      <ListItemAvatar>
        <Avatar>{statusIcon}</Avatar>
      </ListItemAvatar>
      {/*<ListItemText primary={it.name} />*/}
      <ListItemText>
        <StyledName variant="body1">{e.name}</StyledName>
        {description}
        {/*<Button onClick={() => infoToast('asd')}>click</Button>*/}
      </ListItemText>
    </ListItemButton>
  );
};

const StyledName = styled(Typography)``;
const StyledDesc = styled(Typography)`
  opacity: 0.5;
  line-height: 1.3;
`;
