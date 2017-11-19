export const HOUR_DURATION_MS = 3600 * 1000;
export const DAY_DURATION_MS = 24 * HOUR_DURATION_MS;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function metadataTimestampToString(timestamp) {
  const now = Date.now(),
    parsedDate = new Date(timestamp),
    timeBetween = (now - timestamp),
    daysBetween = Math.floor(timeBetween / DAY_DURATION_MS);

  if (daysBetween > 30) {
    const [day, month, year] = [parsedDate.getDay(), parsedDate.getMonth(), parsedDate.getFullYear()];
    return `${year}, ${day}${day === 1 ? 'st' : 'th'} of ${MONTHS[month]}`;
 } else {
    const hoursBetween = Math.floor(timeBetween / HOUR_DURATION_MS);
    return (daysBetween <= 1) ?
      (hoursBetween <= 2) ? 'Less than 2 hours ago' : `${hoursBetween} hours ago` :
      `${daysBetween} days ago`;
 }
}