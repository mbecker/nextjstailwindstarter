export function dbDate(dt: string | Date): string {
  if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  return dt.toISOString().slice(0, 19).replace("T", " ");
}
