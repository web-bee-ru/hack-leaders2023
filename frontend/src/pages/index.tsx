import { Box, Button, styled, Typography } from '@mui/material';
import useModal from '@/hooks/useModal';
import DrawerExample from '@/components/DrawerExample';
import { useContext, useMemo, useState } from 'react';
import { ToastContext } from '@/Providers/ToastProvider';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import DefaultDatePicker from '@/components/UI/DefaultDatePicker';
import DefaultMenu, { MenuOptionProps } from '@/components/UI/DefaultMenu';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StyledReactApexChart = styled(ReactApexChart)`
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: orange;
  }
`;

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

const state = {
  series: [
    {
      name: 'First',
      type: 'column',
      data: [4857, 7289, 8108, 7899, 11140, 13559],
    },
    {
      name: 'Second',
      type: 'column',
      data: [680, 1108, 1200, 1098, 967, 800],
    },

    {
      name: 'Third',
      type: 'line',
      data: [14, 15.2, 14.8, 13.9, 8.68, 5.9],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
    },
    colors: ['#318fb5', '#b0cac7', '#005086', '#f7d6bf', '#001244'],
    stroke: {
      width: [0, 4],
    },
    title: {
      text: 'Graph text',
      style: {
        color: '#b0cac7',
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
    },
    labels: ['2015年度', '2016年度', '2017年度', '2018年度', '2019年度', '2020年度'],
    xaxis: {
      type: 'category',
    },
    yaxis: [
      {
        seriesName: 'First',
        title: {
          text: '人数',
        },
        labels: {
          formatter: (value: number) => {
            return value + '人';
          },
        },
      },
      {
        seriesName: 'First',
        show: false,
      },
      {
        seriesName: 'Third',
        opposite: true,
        title: {
          text: '比率',
        },
        labels: {
          formatter: (value: number) => {
            return value + '%';
          },
        },
      },
    ],
    legend: {
      position: 'right',
      width: 128,
    },
    tooltip: {
      shared: false,
    },
  },
};

const Index = () => {
  const { show } = useModal();
  const { successToast, errorToast, infoToast, warningToast } = useContext(ToastContext);

  const [date, setDate] = useState<Date>();

  const menuOptions = useMemo<MenuOptionProps[]>(
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

  const series = useMemo(() => [{ name: 'Test', data: [44, 55, 41, 17, 15] }], []);
  const chartOptions = useMemo(() => ['A', 'B', 'C', 'D', 'E'], []);

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
        {!menuOptions.length && <Typography variant={'subtitle2'}>Выбери дату, чтобы разблокировать меню</Typography>}
        <DefaultMenu text={'Меню'} options={menuOptions} />
      </Block>
      <Block>
        <Typography variant={'h5'}>График - Line</Typography>
        <ReactApexChart series={state.series} options={state.options} height={350} type={'line'} />
      </Block>
    </Box>
  );
};

export default Index;
