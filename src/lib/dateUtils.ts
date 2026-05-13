/**
 * Calculates the number of days remaining until a specific target date.
 * @param targetDate The date to count down to (format: 'YYYY-MM-DD')
 * @returns The number of days remaining.
 */
export function getDaysRemaining(targetDate: string): number {
  const target = new Date(targetDate);
  const today = new Date();
  
  // Set times to 0 for accurate day calculation
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}
