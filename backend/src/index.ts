import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import { registerRoutes } from './routes';
import * as process from 'process';
import prisma from './prisma';
import { get } from 'lodash';
import fs from 'fs/promises';

dotenv.config({ path: require('find-config')('.env') });

async function main() {
  const app = new Koa();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;
  const HOST = process.env.HOST ?? 'localhost';

  /** Middlewares */
  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(cors());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const status = get(err, 'statusCode', get(err, 'status', 500));
      const message = get(err, 'message', 'Unexpected');
      const context = get(err, 'context', null);

      ctx.status = status;
      ctx.body = {
        status,
        message,
        context,
        timestamp: new Date().toISOString(),
      };
      ctx.app.emit('error', err, ctx);
    }
  });

  await prisma.$connect();
  global.MACHINES = await prisma.machines.findMany();
  global.TMS = await prisma.tms.findMany();
  global.SENSORS = await prisma.sensors.findMany();
  if (process.env.USE_FILES === 'yes') {
    // const strM1s = JSON.stringify(global.M1_VALS);
    // await fs.writeFile('./strM1s.json', strM1s);
    // const strM3s = JSON.stringify(global.M3_VALS);
    // await fs.writeFile('./strM3s.json', strM3s);
    // const sVals = JSON.stringify(global.SENSOR_VALUES);
    // await fs.writeFile('./sVals.json', sVals);
    global.M1_VALS = JSON.parse(await fs.readFile('./strM1s.json').then((b) => b.toString())).map((it) => {
      it.dt = new Date(it.dt);
      return it;
    });
    global.M3_VALS = JSON.parse(await fs.readFile('./strM3s.json').then((b) => b.toString())).map((it) => {
      it.dt = new Date(it.dt);
      return it;
    });
    global.SENSOR_VALUES = JSON.parse(await fs.readFile('./sVals.json').then((b) => b.toString())).map((it) => {
      it.dt = new Date(it.dt);
      return it;
    });
  } else {
    global.M1_VALS = await prisma.tm_m1_values.findMany({
      orderBy: {
        dt: 'asc',
      },
    });
    global.M3_VALS = await prisma.tm_m3_values.findMany({
      orderBy: {
        dt: 'asc',
      },
    });
    global.SENSOR_VALUES = await prisma.sensor_values.findMany({
      orderBy: {
        dt: 'asc',
      },
    });
  }

  /** Routes */
  registerRoutes(app);

  await app.listen(PORT, HOST);
  console.info(`Server started: http://localhost:${PORT}`);
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
