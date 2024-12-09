import { CoPresentOutlined } from "@mui/icons-material";
import { format, roundToNearestMinutes, add, isSameDay, sub, subMinutes, getMinutes, addMinutes , startOfMinute} from "date-fns";

export const dateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = format(date, "dd MMM, yyyy hh:mm a");
  return formattedDate;
};
export const logDateFormat = (dateStr) => {
  // console.log("date str",dateStr)
  const date = new Date(dateStr);
  // console.log("date",date)
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


export const oneMinuteBack = () => subMinutes(new Date(), 1);


export const isMultipleOfFiveMinutes = (date) => {
  const minutes = getMinutes(date); 
  return minutes % 5 === 0;
};

export const getDateForUnavailability = () => {
  const now = new Date()

  return isMultipleOfFiveMinutes(now) ? oneMinuteBack() : now

}


export const generateForwardDateNearestFiveMinutes = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const remainder = minutes % 5;
  const additionalMinutes = remainder === 0 ? 0 : 5 - remainder;
  const roundedDate = addMinutes(startOfMinute(date), additionalMinutes);
  return roundedDate;
};