export type Theme = "light" | "dark";

export const THEME_KEY = "memo-app:theme";

// 첫 화면이 그려지기 전에 실행해서, 저장한 테마(없으면 기기 설정)를 <html>에 바로 적용한다.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getServerThemeSnapshot(): Theme {
  return "light";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function hasSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark";
  } catch {
    return false;
  }
}

export function subscribeTheme(onChange: () => void) {
  // <html data-theme>가 바뀌면 알린다.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // 직접 고르지 않았다면 기기의 다크 모드 설정을 따라간다.
  const media = matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (!hasSavedTheme()) setTheme(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

// 라이트 ↔ 다크 전환 + 선택 저장
export function toggleTheme() {
  const next: Theme = getThemeSnapshot() === "dark" ? "light" : "dark";
  setTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // 저장소를 쓸 수 없으면 이번 방문에서만 적용된다
  }
}
