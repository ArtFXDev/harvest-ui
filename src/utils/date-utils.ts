/**
 * Date utility functions (formatting)
 */
namespace DateUtils {
    /**
     * Convert a date object to MM/DD/YYYY string
     */
    export const dateToMMDDYYYY = (date: Date): string => date.toLocaleDateString("en-US");

    /**
     * Convert a date object to YYYY/MM/DD string
     */
    export const dateToYYYYMMDD = (date: Date): string => new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];

    /**
     * Convert timestamp to MM/DD/YYYY
     */
    export const timestampToMMDDYYY = (timestamp: number): string => dateToMMDDYYYY(new Date(timestamp));


    /**
     * Format seconds to [h]:[m]:s
     * See : https://stackoverflow.com/a/37096512/11452044
     */
    export const secondsToHms = (date: number) => {
        const d = Number(date);
        const m = Math.floor(d / 60);
        const s = Math.floor(d % 3600 % 60);

        const mDisplay = m > 0 ? m + (m === 1 ? " m, " : " m, ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "empty";
        return mDisplay + sDisplay;
    }
}

export default DateUtils;
