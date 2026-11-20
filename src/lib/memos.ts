import type { Database } from "./database.types";
import { parseContent, type Block } from "./memo-content";
import { getSupabase } from "./supabase";

export type MemoColor = "blue" | "green" | "orange" | "pink";
const COLORS: MemoColor[] = ["blue", "green", "orange", "pink"];

export type Memo = {
  id: string;
  title: string;
  content: Block[];
  category: string | null;
  color: MemoColor;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NewMemo = {
  title: string;
  content: Block[];
  category: string | null;
  color: MemoColor;
};

type Row = Database["public"]["Tables"]["memos"]["Row"];

function toMemo(row: Row): Memo {
  return {
    id: row.id,
    title: row.title,
    content: parseContent(row.content),
    category: row.category,
    color: COLORS.find((color) => color === row.color) ?? "blue",
    pinned: row.pinned,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// 모든 메모 (최신순)
export async function fetchMemos(): Promise<Memo[]> {
  const { data, error } = await getSupabase()
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`메모를 불러오지 못했어요. (${error.message})`);
  return data.map(toMemo);
}

// 메모 하나. 없으면 null
export async function fetchMemo(id: string): Promise<Memo | null> {
  const { data, error } = await getSupabase().from("memos").select("*").eq("id", id).maybeSingle();
  if (error) {
    // id 모양이 틀린 경우(uuid가 아님)도 "없는 메모"로 본다.
    if (error.code === "22P02") return null;
    throw new Error(`메모를 불러오지 못했어요. (${error.message})`);
  }
  return data ? toMemo(data) : null;
}

// 새 메모 저장
export async function createMemo(memo: NewMemo): Promise<Memo> {
  const { data, error } = await getSupabase()
    .from("memos")
    .insert({
      title: memo.title,
      content: memo.content as unknown as Database["public"]["Tables"]["memos"]["Insert"]["content"],
      category: memo.category,
      color: memo.color,
    })
    .select()
    .single();
  if (error) throw new Error(`메모를 저장하지 못했어요. (${error.message})`);
  return toMemo(data);
}
