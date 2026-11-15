import dayjs, {type Dayjs} from "dayjs";

export const formatDate = (date: string | Date | Dayjs, format = "MMMM D, YYYY"): string => {
  return dayjs(date).format(format);
};
