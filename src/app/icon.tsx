import { ImageResponse } from "next/og";

// 앱 아이콘. 홈 화면에 추가했을 때 보이는 그림이다.
// 이미지 안에서는 CSS 변수를 쓸 수 없어서 디자인 토큰 값을 그대로 적었다.
const PRIMARY = "#3182f6"; // color/primary
const ON_PRIMARY = "#ffffff"; // text/on-primary

// id마다 /icon/<id> 주소로 PNG가 만들어진다. manifest.ts가 이 주소를 쓴다.
//  - 192, 512: 둥근 모서리 아이콘
//  - maskable: 기기가 모양을 직접 오려도 안 잘리게 그림을 안쪽에 둔 아이콘
export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
    { id: "maskable", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = String(await id);
  const maskable = iconId === "maskable";
  const side = maskable ? 512 : Number(iconId);

  // 메모 아이콘(Icon/Note)의 크기: 둥근 아이콘은 62%, maskable은 안전 영역 안쪽 46%
  const glyph = Math.round(side * (maskable ? 0.46 : 0.62));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PRIMARY,
          borderRadius: maskable ? 0 : Math.round(side * 0.225),
        }}
      >
        <svg width={glyph} height={glyph} viewBox="0 0 22 22" fill="none">
          <path
            d="M6.41667 3.66667H12.8333L16.5 7.33333V18.3333H6.41667V3.66667Z"
            stroke={ON_PRIMARY}
            strokeWidth={1.83333}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.8333 3.66667V7.33333H16.5M9.16667 11H13.75M9.16667 14.6667H13.75"
            stroke={ON_PRIMARY}
            strokeWidth={1.83333}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: side, height: side },
  );
}
