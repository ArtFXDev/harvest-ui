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
    export const dateToYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];

    /**
     * Convert timestamp to MM/DD/YYYY
     */
    export const timestampToMMDDYYY = (timestamp: number): string => dateToMMDDYYYY(new Date(timestamp));
}

export default DateUtils;
