'use strict';

/**
 * Build a query string for a map of params.
 */
export const buildQs = (qsParams: Record<string, any>): string => {
  let qs = '?';
  for (const key in qsParams) {
    const value = qsParams[key];
    qs += `${key}=${value}&`;
  }
  return qs.substring(0, qs.length - 1);
}

/**
 * Convert dates that are in the form of "2019-12-23" to Date object.
 */
export const convertDate = (dateString: string): Date => {
  const dateVals = dateString.split('-');
  const year = parseInt(dateVals[0]);
  const month = parseInt(dateVals[1]);
  const day = parseInt(dateVals[2]);
  console.log((new Date(year, month, day).toString()));
  let date = new Date(year, month, day);
  console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
  return new Date(year, month, day);
};