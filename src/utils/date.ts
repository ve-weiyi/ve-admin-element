import dayjs from "dayjs";

export function formatDate(
  date: number | string | Date,
  format = "YYYY-MM-DD"
): string {
  // 检查是否为字符串
  if (typeof date === "number") {
    const dateTime = new Date(date * 1000);
    return formatDate(dateTime, format);
  }

  return dayjs(date).format(format);
}

export function formatDateTime(
  date: number | string | Date,
  format = "YYYY-MM-DD HH:mm:ss"
): string {
  return formatDate(date, format);
}
