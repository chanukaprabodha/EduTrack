import { format, toZonedTime } from "date-fns-tz";

// Get Sri Lanka date in yyyy/MM/dd
export const formattedDate = (date: Date = new Date()): string => {
  const timeZone = "Asia/Colombo";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "yyyy/MM/dd");
};

// Optional: get full timestamp yyyy/MM/dd HH:mm:ss
export const formattedTimeStamp = (date: Date = new Date()): string => {
  const timeZone = "Asia/Colombo";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "yyyy/MM/dd HH:mm:ss");
};
