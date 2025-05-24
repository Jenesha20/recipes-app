export function truncate(text, maxLength = 20) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
  }
  
  export function formatTime(minutes) {
    if (!minutes && minutes !== 0) return '-';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs ? `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} min` : `${mins} min`;
  }
  