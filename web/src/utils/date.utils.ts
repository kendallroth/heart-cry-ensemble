import dayjs, {type Dayjs} from "dayjs";

export const formatDate = (date: string | Date | Dayjs, format = "MMMM D, YYYY"): string => {
  return dayjs(date).format(format);
};

/**
 * Format date span
 *
 * NOTE: Uses `MMM - MMM YYYY` (same year) or `MMM YYYY - MMM YYYY` (different years)
 */
export const formatDateSpan = (startDate: string | Date | Dayjs, endDate: string | Date | Dayjs): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return start.year() === end.year()
    ? `${start.format("MMM")} - ${end.format("MMM YYYY")}`
    : `${start.format("MMM YYYY")} - ${end.format("MMM YYYY")}`;
};
