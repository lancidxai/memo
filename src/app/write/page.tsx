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
import type { MemoLabel } from "@/components/memo-item";
import { saveMemo } from "@/lib/memo-storage";

const categories = ["업무", "개인", "아이디어"];

const colors: { color: MemoLabel; name: string }[] = [
  { color: "blue", name: "파랑" },
  { color: "green", name: "초록" },
  { color: "orange", name: "주황" },
  { color: "pink", name: "분홍" },
];

const packingList = ["물 두 병", "간식과 바람막이", "보조 배터리"];

export default function Write() {
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("주말 등산 준비");
  const [category, setCategory] = useState("개인");
  const [color, setColor] = useState<MemoLabel>("green");

  // 로컬스토리지에 저장하고 홈으로 간다.
  function handleSave() {
    saveMemo({
      title: title.trim() || "제목 없음",
      body: bodyRef.current?.innerText ?? "",
      category,
      color,
    });
    router.push("/");
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-48 pb-space-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로가기" href="/">
          <IconChevronLeft />
        </IconButton>
        <p className="text-caption-sm whitespace-nowrap text-text-muted">자동 저장됨</p>
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
          {/* 본문: 직접 고쳐 쓸 수 있고, 저장할 때 글자만 가져간다. */}
          <div
            ref={bodyRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label="본문"
            className="flex flex-col gap-space-8 px-space-20 py-space-16 outline-none"
          >
            <h2 className="text-title-lg text-text-primary">준비물</h2>
            <ul className="flex flex-col gap-space-4">
              {packingList.map((item) => (
                <li
                  key={item}
                  className="flex gap-space-8 text-body-md text-text-secondary before:content-['•']"
                >
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="text-title-md text-text-primary">출발</h3>
            <p className="text-body-md text-text-secondary">
              <strong className="font-bold text-text-primary">토요일 오전 7시</strong>에 집 앞에서
              출발한다.
            </p>
          </div>
        </section>
      </main>

      <div className="sticky bottom-space-34">
        <ButtonPrimary onClick={handleSave}>저장하기</ButtonPrimary>
      </div>
    </div>
  );
}
