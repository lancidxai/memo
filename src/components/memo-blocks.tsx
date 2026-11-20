import type { Block } from "@/lib/memo-content";
import { ListItem } from "./list-item";

// 저장된 블록을 상세 화면의 본문으로 그린다. (대제목 / 소제목 / 문단 / 목록)
export function MemoBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-space-12">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="text-title-lg text-text-primary">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={index} className="text-title-md text-text-primary">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-body-md text-text-secondary">
                {block.runs.map((run, runIndex) =>
                  run.bold ? (
                    <strong key={runIndex} className="font-bold text-text-primary">
                      {run.text}
                    </strong>
                  ) : (
                    <span key={runIndex}>{run.text}</span>
                  ),
                )}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-space-4">
                {block.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>{item}</ListItem>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
