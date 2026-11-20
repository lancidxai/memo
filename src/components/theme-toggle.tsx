"use client";

import { useSyncExternalStore } from "react";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeTheme,
  toggleTheme,
} from "@/lib/theme";
import { IconMoon, IconSun } from "./icons";

// 라이트 ↔ 다크 전환 버튼 (Button/Icon 모양: 40×40)
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex size-10 shrink-0 items-center justify-center rounded-sm text-text-primary"
    >
      {isDark ? <IconSun /> : <IconMoon />}
    </button>
  );
}
