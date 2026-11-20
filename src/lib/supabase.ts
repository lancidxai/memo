import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// 접속 주소와 공개 키는 .env.local에서 읽는다. (브라우저에서 쓰는 공개용 값만 둔다)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let client: SupabaseClient<Database> | undefined;

export function getSupabase(): SupabaseClient<Database> {
  if (!url || !key) {
    const missing = [
      !url && "NEXT_PUBLIC_SUPABASE_URL",
      !key && "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ]
      .filter(Boolean)
      .join(", ");
    throw new Error(`.env.local에 ${missing} 값이 없어요. 넣은 뒤 개발 서버를 다시 켜 주세요.`);
  }
  client ??= createClient<Database>(url, key);
  return client;
}
