"use client";

import { use } from "react";
import { countCharacters } from "@/lib/memo-content";
import { formatDateTime, formatEditedAt } from "@/lib/format";
import { useMemoById } from "@/lib/use-remote";
import { Badge } from "./badge";
import { ButtonPrimary } from "./button-primary";
import { IconButton } from "./icon-button";
import { IconChevronLeft, IconMore, IconPin24, IconShare } from "./icons";
import { MemoBlocks } from "./memo-blocks";
import { StatusMessage } from "./status-message";

// 주소의 id를 읽어 그 메모의 상세 화면을 보여 준다. id가 바뀌면 처음부터 다시 불러온다.
export function MemoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <MemoDetailView key={id} id={id} />;
}

function MemoDetailView({ id }: { id: string }) {
  const { state, retry } = useMemoById(id);
  const memo = state.status === "ready" ? state.data : null;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-48 pb-space-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로가기" href="/">
          <IconChevronLeft />
        </IconButton>
        {memo && (
          <div className="flex">
            <IconButton label="고정">
              <IconPin24 />
            </IconButton>
            <IconButton label="공유">
              <IconShare />
            </IconButton>
            <IconButton label="더보기">
              <IconMore />
            </IconButton>
          </div>
        )}
      </nav>

      <main className="flex flex-1 flex-col">
        {state.status === "loading" && <StatusMessage>메모를 불러오는 중이에요.</StatusMessage>}
        {state.status === "error" && <StatusMessage onRetry={retry}>{state.message}</StatusMessage>}
        {state.status === "ready" && !memo && <StatusMessage>메모를 찾을 수 없어요.</StatusMessage>}
        {memo && (
          <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
            <div className="flex items-center gap-space-8">
              {memo.category && <Badge label={memo.category} color={memo.color} />}
              <time
                dateTime={memo.createdAt}
                className="text-caption-sm whitespace-nowrap text-text-muted"
              >
                {formatDateTime(memo.createdAt)}
              </time>
            </div>

            <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>

            <hr className="h-px border-0 bg-border-default" />

            <MemoBlocks blocks={memo.content} />

            <p className="text-caption-sm whitespace-nowrap text-text-muted">
              {countCharacters(memo.content)}자 · {formatEditedAt(memo.updatedAt)} 수정
            </p>
          </article>
        )}
      </main>

      {memo && (
        <div className="sticky bottom-space-34">
          <ButtonPrimary>수정하기</ButtonPrimary>
        </div>
      )}
    </div>
  );
}
