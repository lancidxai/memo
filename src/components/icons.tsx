// 선 아이콘. 색은 currentColor라서 글자색(text-*)을 따른다.
type IconProps = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function IconPlus({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} strokeWidth={1.66667} {...common}>
      <path d="M10 4.16667V15.8333M4.16667 10H15.8333" />
    </svg>
  );
}

export function IconNote({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} strokeWidth={1.83333} {...common}>
      <path d="M6.41667 3.66667H12.8333L16.5 7.33333V18.3333H6.41667V3.66667Z" />
      <path d="M12.8333 3.66667V7.33333H16.5M9.16667 11H13.75M9.16667 14.6667H13.75" />
    </svg>
  );
}

export function IconPin({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} strokeWidth={1.33333} {...common}>
      <path d="M6 2.33333H10L9.4 5.8L11.3333 8H4.66667L6.6 5.8L6 2.33333Z" />
      <path d="M8 8V13.3333" />
    </svg>
  );
}

export function IconChevronLeft({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth={2} {...common}>
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

// 24px 핀 (상세 화면 상단 버튼용)
export function IconPin24({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth={2} {...common}>
      <path d="M9 3.5H15L14.1 8.7L17 12H7L9.9 8.7L9 3.5Z" />
      <path d="M12 12V20" />
    </svg>
  );
}

export function IconShare({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth={2} {...common}>
      <path d="M12 4V15M16 8L12 4L8 8M5 14V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V14" />
    </svg>
  );
}

export function IconMore({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="5.5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18.5" cy="12" r="1.6" />
    </svg>
  );
}

export function IconMoon({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth={2} {...common}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconSun({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth={2} {...common}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </svg>
  );
}

export function IconChevronRight({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} strokeWidth={1.33333} {...common}>
      <path d="M6 4L10 8L6 12" />
    </svg>
  );
}
