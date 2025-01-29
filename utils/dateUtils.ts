/**
 * 🔹 Oblicza timestamp dla początku tygodnia (poniedziałek 00:00:00)
 * @param dateString Data w formacie "YYYY-MM-DD"
 * @returns Timestamp dla początku tygodnia
 */
export function getStartOfWeekTimestamp(dateString: string): number {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay(); // 0 (niedziela) - 6 (sobota)

  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  date.setDate(date.getDate() - daysToMonday);
  date.setHours(0, 0, 0, 0);

  return date.getTime();
}

/**
* 🔹 Konwertuje datę na timestamp (ustawiając czas na 00:00:00)
* @param dateString Data w formacie "YYYY-MM-DD"
* @returns Timestamp dla danej daty o północy
*/
export function getDateTimestamp(dateString: string): number {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[1].substring(0, 5); // Zwraca HH:MM
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}
