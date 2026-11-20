import type { ReactNode } from "react";

// 불러오는 중 / 오류 / 비어 있음을 알리는 카드. onRetry가 있으면 "다시 시도" 버튼이 붙는다.
export function StatusMessage({
  children,
  onRetry,
}: {
  children: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <section
      role="status"
      className="flex flex-col items-start gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24"
    >
      <p className="text-body-md text-text-secondary">{children}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="text-label-md text-primary">
          다시 시도
        </button>
      )}
    </section>
  );
}
