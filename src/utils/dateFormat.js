/**
 * Lightweight date formatting utilities.
 * Replaces react-moment / moment.js (~300KB) with native Intl.DateTimeFormat.
 */

/**
 * Format a Date object to a full date-time string like "Thu, Feb 20, 2025, 3:45 PM"
 * (replaces Moment's `llll` format)
 */
export function formatFullDateTime(date = new Date()) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

/**
 * Format a Unix timestamp to HH:mm (24h) like "06:42"
 * (replaces Moment's unix + format('HH:mm'))
 */
export function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
}

/**
 * Format a date string to abbreviated weekday like "Mon"
 * (replaces Moment's format('ddd'))
 */
export function formatWeekday(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
    }).format(date);
}
