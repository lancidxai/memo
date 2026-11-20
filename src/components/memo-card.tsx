import { CardHeader } from "./card-header";
import { MemoItem, type MemoLabel } from "./memo-item";

export type Memo = {
  id?: string;
  title: string;
  preview: string;
  date: string;
  label: MemoLabel;
  href?: string;
};

// 홈의 메모 카드: 머리글 + 메모 줄 목록
export function MemoCard({
  title,
  memos,
  pin,
  action,
}: {
  title: string;
  memos: Memo[];
  pin?: boolean;
  action?: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-xl bg-surface-card py-space-8">
      <CardHeader title={title} pin={pin} action={action} />
      <ul>
        {memos.map(({ id, ...memo }) => (
          <li key={id ?? memo.title}>
            <MemoItem {...memo} />
          </li>
        ))}
      </ul>
    </section>
  );
}
