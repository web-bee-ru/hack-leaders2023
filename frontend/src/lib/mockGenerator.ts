import * as dateFns from 'date-fns';

const addTick = (date: Date) => {
  return dateFns.addHours(date, 1);
};

const sumArray = (arr: number[]) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const avgArray = (arr: number[]) => {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};

interface PredictionTick {
  date: Date;
  value: number;
}

interface AreaTick {
  date: Date;
  value: [number, number];
}

export function generateFakeData(type: string = 'random', from: Date, to: Date, opts: { averagingCoef: number }) {
  if (type === 'area') return generateAreaData(from, to, opts || {});
  if (type === 'smooth') return generateSmoothData(from, to, opts || {});
  return generateRandomData(from, to);
}

function generateRandomData(from: Date, to: Date) {
  const result: PredictionTick[] = [];
  let current = from;
  while (current < to) {
    result.push({
      date: current,
      value: Math.random(),
    });
    current = addTick(current);
  }
  return result;
}

function generateSmoothData(from: Date, to: Date, { averagingCoef = 10 }) {
  const result: PredictionTick[] = [];
  let current = from;
  while (current < to) {
    result.push({
      date: current,
      value: avgArray([...result.slice(-averagingCoef).map((it) => it.value), Math.random()]),
    });
    current = addTick(current);
  }
  return result;
}

function generateAreaData(from: Date, to: Date, { averagingCoef = 10 }) {
  const result: PredictionTick[] = [];
  let current = from;
  while (current < to) {
    result.push({
      date: current,
      value: avgArray([...result.slice(-averagingCoef).map((it) => it.value), Math.random()]),
    });
    current = addTick(current);
  }
  let areaResult: AreaTick[] = [];
  for (let i = 0; i < result.length; i++) {
    let part = result.slice(i, i + averagingCoef).map((it) => it.value);
    let max = Math.max(...part);
    let min = Math.min(...part);
    areaResult.push({
      date: result[i].date,
      value: [max, min],
    });
  }
  return areaResult;
}
