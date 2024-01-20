import { DateTime } from "luxon";

export default function (val) {
  const date = DateTime.fromISO(new Date(val).toISOString());
  return date.toLocaleString(DateTime.DATETIME_MED);
}
