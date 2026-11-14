// Format a number of seconds as a short countdown, e.g. "45s", "4m 05s", "2h 15m".
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, '0')}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${String(minutes % 60).padStart(2, '0')}m`;
}
