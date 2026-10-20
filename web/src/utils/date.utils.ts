import dayjs, { Dayjs } from "dayjs";

export const formatDate = (
  date: string | Date | Dayjs,
  format: string = "MMMM D, YYYY",
): string => {
  return dayjs(date).format(format);
};
