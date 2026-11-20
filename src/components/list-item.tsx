// Figma: Memo/ListItem — 앞에 점이 붙고 글이 길면 다음 줄로 이어진다.
export function ListItem({ children }: { children: string }) {
  return (
    <li className="flex gap-space-8 text-body-md text-text-secondary">
      <span aria-hidden>•</span>
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}
