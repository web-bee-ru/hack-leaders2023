import * as d from 'date-fns';

export const formatDateForServer = (date: Date) => {
  return encodeURIComponent(d.formatISO(date));
}
