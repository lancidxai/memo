"use client";

import { useSyncExternalStore } from "react";
import {
  formatMemoDate,
  getMemosSnapshot,
  getServerMemosSnapshot,
  makePreview,
  subscribeMemos,
} from "@/lib/memo-storage";
import { MemoCard, type Memo } from "./memo-card";

// 최근 메모 카드: 로컬스토리지에 저장한 새 메모를 맨 위에, 기본 메모를 그 아래에 보여 준다.
export function RecentMemos({ defaultMemos }: { defaultMemos: Memo[] }) {
  const stored = useSyncExternalStore(subscribeMemos, getMemosSnapshot, getServerMemosSnapshot);

  const savedMemos: Memo[] = stored.map((memo) => ({
    id: memo.id,
    title: memo.title,
    preview: makePreview(memo.body),
    date: formatMemoDate(memo.createdAt),
    label: memo.color,
  }));

  return <MemoCard title="최근 메모" memos={[...savedMemos, ...defaultMemos]} action />;
}
