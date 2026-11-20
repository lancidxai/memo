import type { ComponentProps } from "react";

// Figma: Input/Field — 제목 입력 칸. 입력 중에는 파란 테두리, 비어 있으면 회색 안내 문구.
type InputFieldProps = { label: string } & Omit<ComponentProps<"input">, "className">;

export function InputField({ label, ...inputProps }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-space-4 rounded-lg border-2 border-transparent bg-surface-card px-space-20 py-space-16 focus-within:border-primary">
      <span className="text-caption-sm text-text-muted">{label}</span>
      <input
        {...inputProps}
        className="w-full bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
