/**
 * Convert a date object to MM/DD/YYYY string
 */
export const dateToMMDDYYYY = (date: Date): string =>
  date.toLocaleDateString("en-US");

/**
 * Convert a date object to YYYY/MM/DD string
 */
export const dateToYYYYMMDD = (date: Date): string =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

/**
 * Convert timestamp to MM/DD/YYYY
 */
export const timestampToMMDDYYYY = (timestamp: number): string =>
  dateToMMDDYYYY(new Date(timestamp));

/**
 * Convert timestamp to pretty MM:HH with am / pm
 */
export const timestampToMMHH = (timestamp: number): string =>
  new Date(timestamp)
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "h");

/**
 * Format seconds to [h]:[m]:s
 * See : https://stackoverflow.com/a/37096512/11452044
 */
export const secondsToMs = (date: number): string => {
  const d = Number(date);
  const m = Math.floor(d / 60);
  const s = Math.floor((d % 3600) % 60);

  const mDisplay = m > 0 ? m + (m === 1 ? " m, " : " m, ") : "";
  const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "empty";
  return mDisplay + sDisplay;
};

export function secondsToHms(sec: number) {
  const hours = Math.floor(sec / 3600); // get hours
  const minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60); //  get seconds

  /*if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }*/

  return hours + "h " + minutes + "m " + seconds + "s"; // Return is HH : MM : SS
}

/**
 * Get month name of date
 */
export const getMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "long" });
};

/**
 * Get difference in days between two dates
 */
export const dateDiffDays = (date1: Date, date2: Date): number => {
  return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Returns the date yesterday at midnight from now
 */
export function yesterday() {
  const now = new Date();
  const yesterday = new Date(now.getTime());

  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  return yesterday;
}
