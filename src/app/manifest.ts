import type { MetadataRoute } from "next";

// 홈 화면에 추가했을 때의 앱 정보. 주소창 없이 앱처럼(standalone) 열린다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "메모",
    short_name: "메모",
    description: "메모 앱",
    lang: "ko",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f2f4f6", // surface/page
    theme_color: "#f2f4f6", // surface/page
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon/maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
