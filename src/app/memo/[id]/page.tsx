import { Suspense } from "react";
import { MemoDetail } from "@/components/memo-detail";

export default function MemoPage({ params }: PageProps<"/memo/[id]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-surface-page" />}>
      <MemoDetail params={params} />
    </Suspense>
  );
}
