import Link from "next/link";
import { IconNote } from "./icons";

// Figma: Memo/Item (Label=Blue / Green / Orange / Pink)
export type MemoLabel = "blue" | "green" | "orange" | "pink";

const labelStyle: Record<MemoLabel, { tile: string; icon: string }> = {
  blue: { tile: "bg-label-blue-soft", icon: "text-label-blue" },
  green: { tile: "bg-label-green-soft", icon: "text-label-green" },
  orange: { tile: "bg-label-orange-soft", icon: "text-label-orange" },
  pink: { tile: "bg-label-pink-soft", icon: "text-label-pink" },
};

type MemoItemProps = {
  title: string;
  preview: string;
  date: string;
  label?: MemoLabel;
  href?: string;
};

export function MemoItem({ title, preview, date, label = "blue", href = "#" }: MemoItemProps) {
  const style = labelStyle[label];
  return (
    <Link href={href} className="flex h-18 items-center gap-space-16 px-space-20 py-space-12">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-sm ${style.tile} ${style.icon}`}
      >
        <IconNote className="size-[22px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-space-4">
        <span className="text-title-md text-text-primary">{title}</span>
        <span className="truncate text-body-sm text-text-secondary">{preview}</span>
      </span>
      <span className="shrink-0 text-caption-sm whitespace-nowrap text-text-muted">{date}</span>
    </Link>
  );
}
