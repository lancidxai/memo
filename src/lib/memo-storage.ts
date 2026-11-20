import type { MemoLabel } from "@/components/memo-item";

// 로컬스토리지에 저장하는 메모
export type StoredMemo = {
  id: string;
  title: string;
  body: string; // 본문 글자만 (줄바꿈으로 구분)
  category: string;
  color: MemoLabel;
  createdAt: string; // ISO 시각
};

const KEY = "memo-app:memos";
const EMPTY: StoredMemo[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedMemos: StoredMemo[] = EMPTY;

function parse(raw: string | null): StoredMemo[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? (value as StoredMemo[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

// useSyncExternalStore용: 저장된 내용이 같으면 같은 배열을 돌려준다.
export function getMemosSnapshot(): StoredMemo[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // 저장소를 쓸 수 없으면 빈 목록으로 본다
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedMemos = parse(raw);
  }
  return cachedMemos;
}

export function getServerMemosSnapshot(): StoredMemo[] {
  return EMPTY;
}

export function subscribeMemos(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange); // 다른 탭에서 바뀐 경우
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

// 새 메모를 맨 앞에 저장한다.
export function saveMemo(input: Omit<StoredMemo, "id" | "createdAt">): StoredMemo {
  const memo: StoredMemo = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([memo, ...getMemosSnapshot()]));
  listeners.forEach((listener) => listener());
  return memo;
}

// 홈 목록에 보이는 날짜: 오늘 / 어제 / 10월 30일
export function formatMemoDate(iso: string, now = new Date()): string {
  const date = new Date(iso);
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 목록의 미리보기: 본문 줄을 쉼표로 이어 붙인다.
export function makePreview(body: string): string {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(", ");
}
