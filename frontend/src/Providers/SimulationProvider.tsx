import { createContext, createElement, FC, useState } from 'react';
import * as d from 'date-fns';

export const MIN_DATE = new Date('2019-02-16');
export const MAX_DATE = new Date('2021-12-31');
export const DEFAULT_START_DATE = d.subMonths(MAX_DATE, 3);
interface SimulationContextProviderProps {
  now: Date;
  setNow: (d: Date) => void;
}

export const SimulationContext = createContext({
  now: DEFAULT_START_DATE,
  setNow: () => {},
} as SimulationContextProviderProps);
