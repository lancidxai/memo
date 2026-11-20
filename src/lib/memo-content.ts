import type { Json } from "./database.types";

// 서식 있는 내용: 블록 목록으로 저장한다. (HTML을 그대로 저장하지 않는다)
export type Run = { text: string; bold?: boolean };

export type Block =
  | { type: "heading"; text: string } // 대제목
  | { type: "subheading"; text: string } // 소제목
  | { type: "paragraph"; runs: Run[] } // 문단 (굵은 글씨 구간 포함)
  | { type: "list"; items: string[] }; // 목록

// DB에서 읽은 값을 검사하면서 Block[]으로 바꾼다. 모양이 틀린 블록은 건너뛴다.
export function parseContent(value: Json): Block[] {
  if (!Array.isArray(value)) return [];
  const blocks: Block[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const block = item as { [key: string]: Json | undefined };
    if ((block.type === "heading" || block.type === "subheading") && typeof block.text === "string") {
      blocks.push({ type: block.type, text: block.text });
    } else if (block.type === "paragraph" && Array.isArray(block.runs)) {
      const runs: Run[] = [];
      for (const run of block.runs) {
        if (run && typeof run === "object" && !Array.isArray(run) && typeof run.text === "string") {
          runs.push({ text: run.text, bold: run.bold === true || undefined });
        }
      }
      blocks.push({ type: "paragraph", runs });
    } else if (block.type === "list" && Array.isArray(block.items)) {
      blocks.push({
        type: "list",
        items: block.items.filter((entry): entry is string => typeof entry === "string"),
      });
    }
  }
  return blocks;
}

// 홈 목록의 미리보기: 제목 줄을 뺀 첫 블록의 글 (목록이면 쉼표로 이은 글)
export function makePreview(blocks: Block[]): string {
  const first = blocks.find((block) => block.type === "paragraph" || block.type === "list");
  if (!first) return "";
  if (first.type === "list") return first.items.join(", ");
  if (first.type === "paragraph") return first.runs.map((run) => run.text).join("");
  return "";
}

// 상세 화면 아래의 글자 수 ("112자")
export function countCharacters(blocks: Block[]): number {
  let count = 0;
  for (const block of blocks) {
    if (block.type === "heading" || block.type === "subheading") count += block.text.length;
    else if (block.type === "paragraph") count += block.runs.reduce((sum, run) => sum + run.text.length, 0);
    else count += block.items.reduce((sum, item) => sum + item.length, 0);
  }
  return count;
}

const BLOCK_TAGS = new Set(["DIV", "P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "LI"]);

// 작성 화면의 편집 칸(DOM)을 블록 목록으로 바꾼다.
export function domToBlocks(root: HTMLElement): Block[] {
  const blocks: Block[] = [];
  let inline: Node[] = [];

  const flushInline = () => {
    for (const runs of linesFromNodes(inline)) blocks.push({ type: "paragraph", runs });
    inline = [];
  };

  for (const node of Array.from(root.childNodes)) {
    if (!(node instanceof HTMLElement) || !BLOCK_TAGS.has(node.tagName)) {
      inline.push(node);
      continue;
    }
    flushInline();
    const text = (node.textContent ?? "").trim();
    switch (node.tagName) {
      case "H1":
      case "H2":
        if (text) blocks.push({ type: "heading", text });
        break;
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        if (text) blocks.push({ type: "subheading", text });
        break;
      case "UL":
      case "OL": {
        const items = Array.from(node.querySelectorAll("li"))
          .map((li) => (li.textContent ?? "").trim())
          .filter(Boolean);
        if (items.length) blocks.push({ type: "list", items });
        break;
      }
      default:
        // P, DIV: 안에 또 블록이 있으면 다시 풀어서 넣고, 아니면 한 문단(줄바꿈은 문단 나누기)
        if (Array.from(node.children).some((child) => BLOCK_TAGS.has(child.tagName))) {
          blocks.push(...domToBlocks(node));
        } else {
          for (const runs of linesFromNodes(Array.from(node.childNodes))) {
            blocks.push({ type: "paragraph", runs });
          }
        }
    }
  }
  flushInline();
  return blocks;
}

// 인라인 노드들을 줄(<br> 기준)별 Run 목록으로 만든다. 굵은 글씨(<b>, <strong>)를 기억한다.
function linesFromNodes(nodes: Node[]): Run[][] {
  const lines: Run[][] = [[]];

  const walk = (node: Node, bold: boolean) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (text) lines[lines.length - 1].push({ text, bold: bold || undefined });
    } else if (node instanceof HTMLElement) {
      if (node.tagName === "BR") {
        lines.push([]);
        return;
      }
      const nextBold = bold || node.tagName === "B" || node.tagName === "STRONG";
      node.childNodes.forEach((child) => walk(child, nextBold));
    }
  };
  nodes.forEach((node) => walk(node, false));

  return lines
    .map(trimRuns)
    .filter((runs) => runs.length > 0);
}

// 앞뒤 공백을 지우고, 같은 굵기로 이어진 조각을 하나로 합친다.
function trimRuns(runs: Run[]): Run[] {
  const merged: Run[] = [];
  for (const run of runs) {
    const last = merged[merged.length - 1];
    if (last && Boolean(last.bold) === Boolean(run.bold)) last.text += run.text;
    else merged.push({ ...run });
  }
  if (merged.length) merged[0].text = merged[0].text.replace(/^\s+/, "");
  if (merged.length) merged[merged.length - 1].text = merged[merged.length - 1].text.replace(/\s+$/, "");
  return merged.filter((run) => run.text.length > 0);
}
