import { Box, Button, styled, Typography } from '@mui/material';
import useModal from '@/hooks/useModal';
import DrawerExample from '@/components/DrawerExample';
import { useContext, useMemo, useState } from 'react';
import { ToastContext } from '@/Providers/ToastProvider';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import DefaultDatePicker from '@/components/UI/DefaultDatePicker';
import DefaultMenu, { MenuOptionProps } from '@/components/UI/DefaultMenu';

const Block = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${muiHelper.spacing(1)};
`;

const StyledButton = styled(Button)`
  width: 200px;
  display: flex;
  justify-content: flex-start;
`;

const Index = () => {
  const { show } = useModal();
  const { successToast, errorToast, infoToast, warningToast } = useContext(ToastContext);

  const [date, setDate] = useState<Date>();

  const options = useMemo<MenuOptionProps[]>(
    () =>
      date
        ? [
            { title: date.toString(), onClick: () => alert(date) },
            {
              title: new Date(date?.getTime() + 1000 * 60 * 60 * 24).toString(),
              onClick: () => alert(new Date(date?.getTime() + 1000 * 60 * 60 * 24)),
            },
          ]
        : [],
    [date],
  );

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Block>
        <Typography variant={'h5'}>Дровер</Typography>
        <StyledButton onClick={() => show(DrawerExample, { label: 'Example' })}>Open drawer</StyledButton>
      </Block>
      <Block>
        <Typography variant={'h5'}>Снекбары</Typography>
        <StyledButton onClick={() => successToast('Успешно')}>Success toast</StyledButton>
        <StyledButton onClick={() => errorToast('Ошибка')}>Error toast</StyledButton>
        <StyledButton onClick={() => infoToast('Информация')}>Info toast</StyledButton>
        <StyledButton onClick={() => warningToast('Предупреждение')}>Warning toast</StyledButton>
      </Block>
      <Block>
        <Typography variant={'h5'}>Датапикер:</Typography>
        <Typography variant={'subtitle2'}>{date?.toString() ?? 'Выберите дату'}</Typography>
        <DefaultDatePicker value={date} onChange={(value) => setDate(value)} sx={{ width: 200 }} />
      </Block>
      <Block>
        <Typography variant={'h5'}>Меню</Typography>
        {!options.length && <Typography variant={'subtitle2'}>Выбери дату, чтобы разблокировать меню</Typography>}
        <DefaultMenu text={'Меню'} options={options} />
      </Block>
    </Box>
  );
};

export default Index;
