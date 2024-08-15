import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export const timeDiff = (time) => {
  const difference = differenceInSeconds(new Date(), new Date(time));
  if (difference < 60) {
    return `${difference} giây`;
  } else if (difference < 3600) {
    return `${differenceInMinutes(new Date(), new Date(time))} phút`;
  } else if (difference < 86400) {
    return `${differenceInHours(new Date(), new Date(time))} giờ`;
  } else if (difference < 604800) {
    return `${differenceInDays(new Date(), new Date(time))} ngày`;
  } else if (difference < 2592000) {
    return `${differenceInWeeks(new Date(), new Date(time))} tuần`;
  } else if (difference < 31536000) {
    return `${differenceInMonths(new Date(), new Date(time))} tháng`;
  } else {
    return ``;
  }
};
