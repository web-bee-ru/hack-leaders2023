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
import { useMemo } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';

interface ETabProps extends ListItemButtonProps {
  e: E;
}

export default ({ e, ...props }: ETabProps) => {
  const theme = useTheme();
  const status = useMemo<'ok' | 'error' | 'warning'>(() => {
    if (e.daysToM1 != null) return 'error';
    if (e.daysToM3 != null) return 'warning';
    return 'ok';
  }, [e]);

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
          {e.daysToM3 === 0
            ? (<StyledDesc variant="body2">Статус: ПОЛОМКА (М3)</StyledDesc>)
            : (<>
              <StyledDesc variant="body2">Статус: ВОЗМОЖНА ПОЛОМКА</StyledDesc>
              <StyledDesc variant="body2">Дней до M3: {parseInt(e.daysToM3 as any)}</StyledDesc>
            </>)
          }
        </>
      );
    if (status === 'error')
      return (
        <>
          {e.daysToM1 === 0
            ? (<StyledDesc variant="body2">Статус: ОСТАНОВЛЕН (М1)</StyledDesc>)
            : (<>
              <StyledDesc variant="body2">Статус: ВОЗМОЖНА ОСТАНОВКА</StyledDesc>
              <StyledDesc variant="body2">Дней до M1: {parseInt(e.daysToM1 as any)}</StyledDesc>
            </>)
          }
        </>
      );
  }, [status]);

  return (
    <ListItemButton {...props}>
      <ListItemAvatar>
        <Avatar>{statusIcon}</Avatar>
      </ListItemAvatar>
      {/*<ListItemText primary={it.name} />*/}
      <ListItemText>
        <StyledName variant="body1">{e.name}</StyledName>
        {description}
      </ListItemText>
    </ListItemButton>
  );
};

const StyledName = styled(Typography)``;
const StyledDesc = styled(Typography)`
  opacity: 0.5;
  line-height: 1.3;
`;
