export function dbDate(dt: string | Date): string {
  if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  return dt.toISOString().slice(0, 19).replace("T", " ");
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export function normalizeDate(dt: any): string {
  return new Date(dt).toLocaleDateString(undefined, options);
}

export function normalizeDateSplit(dt: any): string {
  const dts = new Date(dt).toLocaleDateString(undefined, options).split(', ');
  return dts[1] + '@' + dts[0];
}

export function normalizeMovingTime(dt: any): string {
  return `${new Date((dt as number) * 1000).toISOString().substring(11, 16)}h`;
}

export function normalizeDistance(n: any): string {
  return `${((n as number) / 1000).toFixed(2)}km`
}