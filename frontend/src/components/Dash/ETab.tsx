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
          <StyledDesc variant="body2">Статус: ВНИМАНИЕ</StyledDesc>
          <StyledDesc variant="body2">Дней до M3: {e.daysToM3}</StyledDesc>
        </>
      );
    if (status === 'error')
      return (
        <>
          <StyledDesc variant="body2">Статус: ОШИБКА</StyledDesc>
          <StyledDesc variant="body2">Дней до M1: {e.daysToM3}</StyledDesc>
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
