import { ImageResponse } from "next/og";

// iOS 홈 화면 아이콘. iOS가 모서리를 직접 둥글게 오리므로 꽉 찬 사각형으로 만든다.
const PRIMARY = "#3182f6"; // color/primary
const ON_PRIMARY = "#ffffff"; // text/on-primary

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width={104} height={104} viewBox="0 0 22 22" fill="none">
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
    { ...size },
  );
}
