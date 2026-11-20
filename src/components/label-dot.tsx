import type { MemoLabel } from "./memo-item";

// Figma: Label/Dot — 색 라벨 고르기. 고른 색은 바깥에 파란 테두리(2px)가 생긴다.
const dotColor: Record<MemoLabel, string> = {
  blue: "bg-label-blue",
  green: "bg-label-green",
  orange: "bg-label-orange",
  pink: "bg-label-pink",
};

type LabelDotProps = {
  color: MemoLabel;
  name: string; // 접근성 이름 (예: 파랑)
  selected?: boolean;
  onClick?: () => void;
};

export function LabelDot({ color, name, selected = false, onClick }: LabelDotProps) {
  return (
    <button
      type="button"
      aria-label={name}
      aria-pressed={selected}
      onClick={onClick}
      className={`flex size-8 shrink-0 items-center justify-center rounded-full border-solid border-primary ${
        selected ? "border-2" : "border-0"
      }`}
    >
      <span className={`size-[22px] rounded-full ${dotColor[color]}`} />
    </button>
  );
}
