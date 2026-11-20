"use client";

import { useSyncExternalStore } from "react";
import { formatMemoDate, formatToday } from "@/lib/format";
import { makePreview } from "@/lib/memo-content";
import type { Memo } from "@/lib/memos";
import { useMemos } from "@/lib/use-remote";
import { Chip } from "./chip";
import { MemoCard, type MemoCardItem } from "./memo-card";
import { StatusMessage } from "./status-message";

const categories = ["전체", "업무", "개인", "아이디어"];

const noSubscribe = () => () => {};

function toCardItem(memo: Memo): MemoCardItem {
  return {
    id: memo.id,
    title: memo.title,
    preview: makePreview(memo.content),
    date: formatMemoDate(memo.createdAt),
    label: memo.color,
    href: `/memo/${memo.id}`,
  };
}

// 홈 본문: Supabase에서 메모를 읽어 보여 준다.
export function HomeContent() {
  const { state, retry } = useMemos();
  // 서버가 미리 그린 화면에는 날짜를 비워 두고, 브라우저에서 오늘 날짜를 채운다.
  const today = useSyncExternalStore(noSubscribe, () => formatToday(), () => "");

  const memos = state.status === "ready" ? state.data : [];
  const pinned = memos.filter((memo) => memo.pinned).map(toCardItem);
  const recent = memos.filter((memo) => !memo.pinned).map(toCardItem);

  return (
    <main className="flex flex-1 flex-col gap-space-16">
      <header className="flex flex-col gap-space-8 px-space-8">
        <p className="min-h-[22px] text-caption-md text-text-muted">{today}</p>
        <h1 className="text-heading-xl text-text-primary">
          {state.status === "ready" ? (
            <>
              오늘까지 메모를
              <br />
              <span className="text-primary">{memos.length}개</span> 남겼어요
            </>
          ) : (
            <>
              오늘까지 남긴
              <br />
              메모예요
            </>
          )}
        </h1>
      </header>

      <div className="flex gap-space-8 overflow-x-auto px-space-4" role="group" aria-label="분류">
        {categories.map((name) => (
          <Chip key={name} label={name} selected={name === "전체"} />
        ))}
      </div>

      {state.status === "loading" && <StatusMessage>메모를 불러오는 중이에요.</StatusMessage>}
      {state.status === "error" && <StatusMessage onRetry={retry}>{state.message}</StatusMessage>}
      {state.status === "ready" && memos.length === 0 && (
        <StatusMessage>아직 메모가 없어요. 아래 버튼으로 첫 메모를 써 보세요.</StatusMessage>
      )}
      {pinned.length > 0 && <MemoCard title="고정한 메모" memos={pinned} pin />}
      {recent.length > 0 && <MemoCard title="최근 메모" memos={recent} action />}
    </main>
  );
}
