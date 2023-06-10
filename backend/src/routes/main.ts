import Router from '@koa/router';
import prisma from '../prisma';
import { type } from 'arktype';
import { BadRequestError } from '../lib/errors';
import * as d from 'date-fns';
import _ from 'lodash';
import { getMinTmTime } from '../lib/utils';
import { returnOf } from 'arktype/dist/types/utils/generics';
import { machines, tms, tm_m1_values, tm_m3_values, sensor_values, tm_m1_predictions, tm_m3_predictions } from '../prisma/client';
import { ParameterizedContext } from 'koa';

const INTERVAL_DAYS = 30;
const MAX_REAL_DATE = new Date('2021-12-30');
function getStartDate(ctx: ParameterizedContext): Date {
  const date = ctx.query.date ? new Date(ctx.query.date as string) : d.subDays(new Date(), INTERVAL_DAYS);
  return date;
}

export default function registerUserRoutes(router: Router, prefix = '/main') {
  router.post([prefix], async (ctx) => {
    const userValidator = type({
      name: 'string',
      age: 'number',
    });

    const user = userValidator(ctx.request.body);

    if (user.problems?.length || !user.data) throw new BadRequestError(user.problems[0].message);

    ctx.body = await prisma.user.create({ data: user.data });
  });

  router.get([prefix], async (ctx) => {
    // ctx.body = await prisma.machines.findMany();
    ctx.body = await prisma.sensor_values.findMany({ take: 20 });
  });

  router.get([prefix + '/machines'], async (ctx) => {
    ctx.body = global.MACHINES;
  });

  router.get([prefix + '/tms'], async (ctx) => {
    ctx.body = global.TMS;
  });

  router.get([prefix + '/sensors'], async (ctx) => {
    ctx.body = global.SENSORS;
  });

  router.get([prefix + '/machines-for-tabs'], async (ctx) => {
    const date = getStartDate(ctx);
    const exs = global.MACHINES as machines[];
    const fromDate = d.subDays(date, 1);
    const toDate = date;
    let m1s, m3s;
    if (MAX_REAL_DATE > toDate) {
      m1s = _.filter(global.M1_VALS as tm_m1_values, (it) => {
        return it.dt > fromDate && it.dt < toDate;
      });
      m3s = _.filter(global.M3_VALS as tm_m3_values, (it) => {
        return it.dt > fromDate && it.dt < toDate;
      });
    }
    else {
      m1s = _.filter(global.M1_PREDS as tm_m1_predictions, (it) => {
        return it.dt > fromDate && it.dt <= toDate;
      });
      m3s = _.filter(global.M3_PREDS as tm_m3_predictions, (it) => {
        return it.dt > fromDate && it.dt <= toDate;
      });
    }
    m1s = m1s.slice(-365 * 24); // @NOTE: хоть как-то спасаю бедную виртуалку...
    m3s = m3s.slice(-365 * 24); // @NOTE: хоть как-то спасаю бедную виртуалку...
    const groupedM1s = _.groupBy(m1s, 'machine_id');
    const groupedM3s = _.groupBy(m3s, 'machine_id');
    const populatedExs = exs.map((ex) => {
      let exM1s = groupedM1s[ex.id] || [];
      let exM3s = groupedM3s[ex.id] || [];
      // console.log({ exM1s, exM3s });
      return {
        ...ex,
        secondsToM1: getMinTmTime(_.last(_.orderBy(exM1s, 'dt'))),
        secondsToM3: getMinTmTime(_.last(_.orderBy(exM3s, 'dt'))),
      };
    });
    ctx.body = populatedExs;
  });

  router.get([prefix + '/tms-for-table'], async (ctx) => {
    const date = getStartDate(ctx);
    const machine_id = Number(ctx.query.machine_id) || 4;

    let m1s, m3s;
    if (MAX_REAL_DATE > date) {
      m1s = _.filter(global.M1_VALS as tm_m1_values, (it) => {
        return it.machine_id === machine_id && it.dt < date;
      });
      m3s = _.filter(global.M3_VALS as tm_m3_values, (it) => {
        return it.machine_id === machine_id && it.dt < date;
      });
    }
    else {
      m1s = _.filter(global.M1_VALS as tm_m1_values, (it) => {
        return it.machine_id === machine_id;
      });
      m3s = _.filter(global.M3_VALS as tm_m3_values, (it) => {
        return it.machine_id === machine_id;
      });
      m1s = m1s.concat(_.filter(global.M1_PREDS as tm_m1_predictions, (it) => {
        return it.machine_id === machine_id && it.dt < date;
      }))
      m3s = m3s.concat(_.filter(global.M3_PREDS as tm_m3_predictions, (it) => {
        return it.machine_id === machine_id && it.dt < date;
      }))
    }
    m1s = m1s.slice(-365 * 24); // @NOTE: хоть как-то спасаю бедную виртуалку...
    m3s = m3s.slice(-365 * 24); // @NOTE: хоть как-то спасаю бедную виртуалку...
    const tms = global.TMS.slice() as tms[];
    const tmsSet = {};
    tms.forEach((tm) => {
      tmsSet[tm.model_column_name || 'unknown'] = {
        lastM1Crash: null,
        lastM3Crash: null,
        nextM1CrashSec: null,
        nextM3CrashSec: null,
      };
    });
    tms.forEach((tm) => {
      const col = tm.model_column_name || 'unknown';
      tmsSet[col].tmId = tm.id;
      tmsSet[col].tmColumnName = tm.model_column_name;
      tmsSet[col].avgM1FixSec = tm.average_m1_fix_time_seconds;
      tmsSet[col].avgM3FixSec = tm.average_m3_fix_time_seconds;
      tmsSet[col].medM1FixSec = tm.median_m1_fix_time_seconds;
      tmsSet[col].medM3FixSec = tm.median_m3_fix_time_seconds;
      tmsSet[col].tmName = tm.display_name;
      for (let i = m1s.length - 1; i >= 0; i--) {
        if (m1s[i][col] < 60 * 60 * 2) {
          // @NOTE: мы поломаны.
          tmsSet[col].lastM1Crash = m1s[i].dt;
          break;
        }
      }
      for (let i = m3s.length - 1; i >= 0; i--) {
        if (m3s[i][col] < 60 * 60 * 2) {
          // @NOTE: мы поломаны.
          tmsSet[col].lastM3Crash = m3s[i].dt;
          break;
        }
      }
      const lastM1 = _.last(m1s);
      tmsSet[col].nextM1CrashSec = lastM1 ? lastM1[col] : null;
      const lastM3 = _.last(m3s);
      tmsSet[col].nextM3CrashSec = lastM3 ? lastM3[col] : null;
    });
    ctx.body = _.values(tmsSet);
  });

  router.get([prefix + '/sensors-data'], async (ctx) => {
    const date = getStartDate(ctx);
    const machine_id = Number(ctx.query.machine_id) || 4;
    const fromDate = d.subDays(date, INTERVAL_DAYS);
    const toDate = date;
    const sVals = _.filter(global.SENSOR_VALUES as sensor_values, (it) => {
      return it.machine_id === machine_id && it.dt < toDate && it.dt > fromDate;
    });
    ctx.body = sVals;
  });

  router.get([prefix + '/prediction-data'], async (ctx) => {
    const date = getStartDate(ctx);
    const machine_id = Number(ctx.query.machine_id) || 4;
    const m_type = ctx.query.m_type || 'm1';
    const column_name = ctx.query.column_name || 'rotor';
    const fromDate = d.subDays(date, INTERVAL_DAYS);
    const toDate = date;

    let preds, real;
    if (m_type === 'm3') {
      preds = await prisma.tm_m3_predictions.findMany({
        select: {
          dt: true,
          [column_name as any]: true,
        },
        where: {
          machine_id,
          dt: {
            lte: toDate,
            gte: fromDate,
          },
        },
        orderBy: {
          dt: 'asc',
        },
      });
      real = await prisma.tm_m3_values.findMany({
        select: {
          dt: true,
          [column_name as any]: true,
        },
        where: {
          machine_id,
          dt: {
            lte: toDate,
            gte: fromDate,
          },
        },
        orderBy: {
          dt: 'asc',
        },
      });
    } else {
      preds = await prisma.tm_m1_predictions.findMany({
        select: {
          dt: true,
          [column_name as any]: true,
        },
        where: {
          machine_id,
          dt: {
            lte: toDate,
            gte: fromDate,
          },
        },
        orderBy: {
          dt: 'asc',
        },
      });
      real = await prisma.tm_m1_values.findMany({
        select: {
          dt: true,
          [column_name as any]: true,
        },
        where: {
          machine_id,
          dt: {
            lte: toDate,
            gte: fromDate,
          },
        },
        orderBy: {
          dt: 'asc',
        },
      });
    }
    ctx.body = [
      ...real.map((it) => ({
        ...it,
        type: 'real',
      })),
      ...preds.map((it) => ({
        ...it,
        type: 'predicted',
      })),
    ];
  });
}
