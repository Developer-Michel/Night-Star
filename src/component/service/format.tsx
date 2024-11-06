export function getCurrentEasternTimeDate(): Date {
  // Get the current date and time in UTC
  const now = new Date();

  // Define Eastern Standard Time and Eastern Daylight Time offsets
  const easternOffsetStandard = -5; // EST (UTC-5)
  const easternOffsetDaylight = -4; // EDT (UTC-4)

  // Determine if it's currently Daylight Saving Time in Eastern Time
  const isDaylightSaving =
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    }).resolvedOptions().timeZone === "America/New_York";

  // Calculate the offset in hours to Eastern Time
  const easternOffset = isDaylightSaving ? easternOffsetDaylight : easternOffsetStandard;

  // Adjust the current date by the Eastern Time offset
  const easternTime = new Date(now.getTime() + easternOffset * 60 * 60 * 1000);

  return easternTime;
}
export function isToday(date: Date) {
  const today = getCurrentEasternTimeDate();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
