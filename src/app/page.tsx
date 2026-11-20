import { ButtonPrimary } from "@/components/button-primary";
import { HomeContent } from "@/components/home-content";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-64 pb-space-34">
      {/* 위쪽 여백 안에 둔 테마 전환 버튼 (레이아웃은 그대로) */}
      <div className="absolute top-space-12 right-space-16">
        <ThemeToggle />
      </div>

      <HomeContent />

      <div className="sticky bottom-space-34">
        <ButtonPrimary icon href="/write">
          새 메모 쓰기
        </ButtonPrimary>
      </div>
    </div>
  );
}
