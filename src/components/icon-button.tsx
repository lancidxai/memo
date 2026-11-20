import Link from "next/link";
import type { ReactNode } from "react";

// Figma: Button/Icon — 40×40 누르는 영역 가운데에 아이콘을 둔다.
type IconButtonProps = {
  label: string; // 접근성 이름 (예: 뒤로가기)
  children: ReactNode;
  href?: string;
};

const className =
  "flex size-10 shrink-0 items-center justify-center rounded-sm text-text-primary";

export function IconButton({ label, children, href }: IconButtonProps) {
  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={className}>
      {children}
    </button>
  );
}
