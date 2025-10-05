import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDateToString = (
  date: Date,
  showTimeArg?: boolean,
  timeFormatArg: "12h" | "24h" = "24h",
): string => {
  // Use local methods
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  let dateString = `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;

  if (showTimeArg) {
    let hours = date.getHours(); // Local hours
    const minutes = date.getMinutes(); // Local minutes
    let amPm = "";

    if (timeFormatArg === "12h") {
      amPm = hours >= 12 ? " PM" : " AM";
      hours = hours % 12 || 12; // Convert 0/12 to 12 for 12h format
    }

    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${amPm}`;
    dateString += ` ${timeString}`;
  }

  return dateString;
};