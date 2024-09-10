import dayjs from 'dayjs';


export const dateFormat = (date) => {
  const dateStr = date;
  const newDate = new Date(dateStr);
  const formattedDate = dayjs(newDate).format("DD MMM, YYYY hh:mm A");
  return formattedDate;
};
