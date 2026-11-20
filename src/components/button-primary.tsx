import Link from "next/link";
import type { ReactNode } from "react";
import { IconPlus } from "./icons";

// Figma: Button/Primary — 화면의 주 버튼. 아래쪽에 가로로 꽉 차게 둔다.
type ButtonPrimaryProps = {
  children: ReactNode;
  icon?: boolean;
  href?: string; // 있으면 다른 화면으로 가는 링크가 된다
  onClick?: () => void;
};

const className =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md whitespace-nowrap text-text-on-primary";

export function ButtonPrimary({ children, icon = false, href, onClick }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <IconPlus className="size-5" />}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
