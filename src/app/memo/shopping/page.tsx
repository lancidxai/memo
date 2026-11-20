import { Badge } from "@/components/badge";
import { ButtonPrimary } from "@/components/button-primary";
import { IconButton } from "@/components/icon-button";
import {
  IconChevronLeft,
  IconMore,
  IconPin24,
  IconShare,
} from "@/components/icons";
import { ListItem } from "@/components/list-item";

const shoppingList = [
  "우유 한 팩과 계란 열 개",
  "사과 세 개와 바나나 한 송이",
  "커피 원두 200g",
  "식빵과 딸기잼",
];

export default function MemoDetail() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-space-16 bg-surface-page px-space-16 pt-space-48 pb-space-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로가기" href="/">
          <IconChevronLeft />
        </IconButton>
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
      </nav>

      <main className="flex flex-1 flex-col">
        <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
          <div className="flex items-center gap-space-8">
            <Badge label="개인" color="pink" />
            <time className="text-caption-sm whitespace-nowrap text-text-muted">
              10월 30일 금요일 오전 9:12
            </time>
          </div>

          <h1 className="text-heading-lg text-text-primary">장보기 목록</h1>

          <hr className="h-px border-0 bg-border-default" />

          <div className="flex flex-col gap-space-12">
            <h2 className="text-title-lg text-text-primary">이번 주 장보기</h2>
            <p className="text-body-md text-text-secondary">
              주말 전에 마트에서 한 번에 사 오기.{" "}
              <strong className="font-bold text-text-primary">총 예산은 5만 원</strong>{" "}
              안쪽으로 맞춘다.
            </p>

            <h3 className="text-title-md text-text-primary">사야 할 것</h3>
            <ul className="flex flex-col gap-space-4">
              {shoppingList.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </ul>

            <h3 className="text-title-md text-text-primary">확인할 것</h3>
            <p className="text-body-md text-text-secondary">
              냉장고에 남은 채소가 있는지 먼저 본다.{" "}
              <strong className="font-bold text-text-primary">저녁 7시 전</strong>에는
              계산까지 끝낸다.
            </p>
          </div>

          <p className="text-caption-sm whitespace-nowrap text-text-muted">
            112자 · 오늘 오전 9:12 수정
          </p>
        </article>
      </main>

      <div className="sticky bottom-space-34">
        <ButtonPrimary>수정하기</ButtonPrimary>
      </div>
    </div>
  );
}
