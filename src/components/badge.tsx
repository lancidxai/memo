import type { MemoLabel } from "./memo-item";

// Figma: Badge — 메모의 분류 배지. 색은 메모의 색 라벨을 따른다.
const labelStyle: Record<MemoLabel, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};

export function Badge({ label, color }: { label: string; color: MemoLabel }) {
  return (
    <span
      className={`flex h-[26px] items-center rounded-full px-space-8 text-caption-sm whitespace-nowrap ${labelStyle[color]}`}
    >
      {label}
    </span>
  );
}
