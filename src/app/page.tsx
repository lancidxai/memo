import { ButtonPrimary } from "@/components/button-primary";
import { Chip } from "@/components/chip";
import { MemoCard, type Memo } from "@/components/memo-card";
import { RecentMemos } from "@/components/recent-memos";
import { ThemeToggle } from "@/components/theme-toggle";

const categories = ["전체", "업무", "개인", "아이디어"];

const pinnedMemos: Memo[] = [
  { title: "디자인 리뷰 회의록", preview: "검수 기준과 다음 할 일 정리", date: "오늘", label: "blue" },
  { title: "주말 등산 준비", preview: "물 두 병, 간식, 바람막이 챙기기", date: "어제", label: "green" },
];

const recentMemos: Memo[] = [
  { title: "장보기 목록", preview: "우유, 계란, 사과, 커피 원두", date: "오늘", label: "pink", href: "/memo/shopping" },
  { title: "앱 아이콘 아이디어", preview: "메모지 모서리가 접힌 모양", date: "오늘", label: "orange" },
  { title: "읽을 책", preview: "디자인 시스템 책 두 권", date: "어제", label: "green" },
];

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-64 pb-space-34">
      {/* 위쪽 여백 안에 둔 테마 전환 버튼 (레이아웃은 그대로) */}
      <div className="absolute top-space-12 right-space-16">
        <ThemeToggle />
      </div>
      <main className="flex flex-1 flex-col gap-space-16">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-muted">10월 30일 금요일</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">128개</span> 남겼어요
          </h1>
        </header>

        <div className="flex gap-space-8 overflow-x-auto px-space-4" role="group" aria-label="분류">
          {categories.map((name) => (
            <Chip key={name} label={name} selected={name === "전체"} />
          ))}
        </div>

        <MemoCard title="고정한 메모" memos={pinnedMemos} pin />
        <RecentMemos defaultMemos={recentMemos} />
      </main>

      <div className="sticky bottom-space-34">
        <ButtonPrimary icon href="/write">
          새 메모 쓰기
        </ButtonPrimary>
      </div>
    </div>
  );
}
