import { DateTime } from 'luxon';

export function formatDate(date: string | Date, timeZone: string, formatString: string): string {
    let formattedDate;

    if (date instanceof Date) {
        formattedDate = DateTime.fromJSDate(date, { zone: timeZone }).toFormat(formatString);
    } else {
        formattedDate = DateTime.fromISO(date, { zone: timeZone }).toFormat(formatString);
    }

    return formattedDate;
}
