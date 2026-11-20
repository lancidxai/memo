"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ButtonFormat } from "@/components/button-format";
import { ButtonPrimary } from "@/components/button-primary";
import { Chip } from "@/components/chip";
import { IconButton } from "@/components/icon-button";
import { IconChevronLeft } from "@/components/icons";
import { InputField } from "@/components/input-field";
import { LabelDot } from "@/components/label-dot";
import { domToBlocks } from "@/lib/memo-content";
import { createMemo, type MemoColor } from "@/lib/memos";

const categories = ["업무", "개인", "아이디어"];

const colors: { color: MemoColor; name: string }[] = [
  { color: "blue", name: "파랑" },
  { color: "green", name: "초록" },
  { color: "orange", name: "주황" },
  { color: "pink", name: "분홍" },
];

export default function Write() {
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("개인");
  const [color, setColor] = useState<MemoColor>("green");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Supabase에 저장하고 홈으로 간다.
  async function handleSave() {
    const content = bodyRef.current ? domToBlocks(bodyRef.current) : [];
    if (!title.trim() && content.length === 0) {
      setError("제목이나 내용을 입력해 주세요.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await createMemo({ title: title.trim() || "제목 없음", content, category, color });
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장하지 못했어요.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-48 pb-space-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로가기" href="/">
          <IconChevronLeft />
        </IconButton>
      </nav>

      <main className="flex flex-1 flex-col gap-space-12">
        <InputField
          label="제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력하세요"
        />

        <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
          <div className="flex items-center gap-space-8">
            <p className="text-caption-sm whitespace-nowrap text-text-muted">분류</p>
            {categories.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={name === category}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
          <div className="flex items-center gap-space-8">
            <p className="text-caption-sm whitespace-nowrap text-text-muted">색</p>
            {colors.map((item) => (
              <LabelDot
                key={item.color}
                color={item.color}
                name={item.name}
                selected={item.color === color}
                onClick={() => setColor(item.color)}
              />
            ))}
          </div>
        </div>

        <section className="overflow-hidden rounded-lg border-2 border-solid border-primary bg-surface-card">
          <div className="flex h-13 items-center gap-space-4 px-space-12" role="toolbar" aria-label="서식">
            <ButtonFormat label="B" active />
            <ButtonFormat label="제목" />
            <ButtonFormat label="소제목" />
            <ButtonFormat label="목록" />
          </div>
          <hr className="h-px border-0 bg-border-default" />
          {/* 본문: 직접 쓰면 저장할 때 문단으로 바뀐다. */}
          <div
            ref={bodyRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label="본문"
            data-placeholder="내용을 입력하세요"
            className="min-h-40 px-space-20 py-space-16 text-body-md text-text-secondary outline-none empty:before:text-text-muted empty:before:content-[attr(data-placeholder)]"
          />
        </section>
      </main>

      <div className="sticky bottom-space-34 flex flex-col gap-space-8">
        {error && (
          <p role="alert" className="px-space-8 text-caption-sm text-text-secondary">
            {error}
          </p>
        )}
        <ButtonPrimary onClick={handleSave} disabled={saving}>
          {saving ? "저장하는 중…" : "저장하기"}
        </ButtonPrimary>
      </div>
    </div>
  );
}
