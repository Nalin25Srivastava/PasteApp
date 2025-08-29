/* export const FormatDate = (date) => {
  // Ensure the date is a valid Date object
  const _date = new Date(date);

  // Check if the date is valid
  if (isNaN(_date)) {
    console.error('Invalid date');
    return 'Invalid Date';
  }

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(_date);

  return formattedDate;
};
 */

// utils/formatDate.js
export const FormatDate = (dateString) => {
  if (!dateString) return "N/A"; // handle undefined/null

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date"; // if not parsable
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
