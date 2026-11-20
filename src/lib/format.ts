// 날짜·시각 표시 (기기의 시간대 기준)
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

function dayDiff(date: Date, now: Date) {
  return Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);
}

function timeLabel(date: Date) {
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour < 12 ? "오전" : "오후"} ${hour % 12 || 12}:${minute}`;
}

// 홈 위쪽 날짜: 10월 30일 금요일
export function formatToday(now = new Date()): string {
  return `${now.getMonth() + 1}월 ${now.getDate()}일 ${WEEKDAYS[now.getDay()]}요일`;
}

// 홈 목록의 날짜: 오늘 / 어제 / 10월 30일
export function formatMemoDate(iso: string, now = new Date()): string {
  const date = new Date(iso);
  const days = dayDiff(date, now);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 상세 위쪽: 10월 30일 금요일 오전 9:12
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS[date.getDay()]}요일 ${timeLabel(date)}`;
}

// 상세 아래: 오늘 오전 9:12 / 어제 오전 9:12 / 10월 30일 오전 9:12
export function formatEditedAt(iso: string, now = new Date()): string {
  const date = new Date(iso);
  return `${formatMemoDate(iso, now)} ${timeLabel(date)}`;
}
