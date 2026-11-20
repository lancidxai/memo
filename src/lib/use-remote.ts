"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMemo, fetchMemos, type Memo } from "./memos";

export type Remote<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };

// 불러오기 상태(불러오는 중 / 오류 / 완료)와 다시 시도 함수를 돌려준다.
// load는 바뀌지 않는 함수여야 한다. (바뀌면 다시 불러온다)
export function useRemote<T>(load: () => Promise<T>) {
  const [state, setState] = useState<Remote<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    load()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "알 수 없는 오류가 났어요.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }, []);

  return { state, retry };
}

export function useMemos() {
  return useRemote<Memo[]>(fetchMemos);
}

export function useMemoById(id: string) {
  const load = useCallback(() => fetchMemo(id), [id]);
  return useRemote<Memo | null>(load);
}
