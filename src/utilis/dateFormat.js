import { format, roundToNearestMinutes, add, isSameDay, sub } from "date-fns";

export const dateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = format(date, "dd MMM, yyyy hh:mm a");
  return formattedDate;
};
export const logDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = format(date, "dd MMM, yyyy");
  return formattedDate;
};

export const generateDateNearestFiveMinutes = () => {
  const date = new Date();
  const roundedDate = roundToNearestMinutes(date, { nearestTo: 5 });
  return roundedDate;
};

export const generateEndDateAndTimeNearestFiveMinutes = () => {
  const now = new Date();
  const datePlusOneHour = add(now, { hours: 1 });
  const roundedDate = roundToNearestMinutes(datePlusOneHour, { nearestTo: 5 });
  return roundedDate;
};

export const getMinTime = (startTime, endTime) => {
  return isSameDay(startTime, endTime) ? startTime : undefined;
};

export const getToday = () => new Date();

export const oneMonthFromToday = () => sub(getToday(), { months: 1 });
