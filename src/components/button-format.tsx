// Figma: Button/Format (State=Default / Active) — 본문 서식 버튼
type ButtonFormatProps = {
  label: string;
  active?: boolean;
};

export function ButtonFormat({ label, active = false }: ButtonFormatProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`flex h-9 shrink-0 items-center justify-center rounded-sm px-space-12 text-label-md whitespace-nowrap ${
        active ? "bg-label-blue-soft text-primary" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
