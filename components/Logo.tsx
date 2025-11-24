export const LogoMark1 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="16"
      cy="16"
      r="15"
      stroke={color}
      strokeWidth="1.5"
      opacity="0.5"
    />
    <circle cx="16" cy="16" r="2.5" fill={color} />
    <path
      d="M 16 8 Q 18 12 16 14"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 22 16 Q 18 18 16 16"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 16 24 Q 14 20 16 18"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const LogoMark2 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 16 6 Q 22 10 20 16 Q 22 22 16 26 Q 10 22 12 16 Q 10 10 16 6"
      fill={color}
      opacity="0.8"
    />
    <circle cx="16" cy="16" r="3" fill="white" />
  </svg>
);

export const LogoMark3 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 16 8 L 20 16 L 16 24 L 12 16 Z"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="2.5" fill={color} />
  </svg>
);

export const LogoMark4 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" />
    <path
      d="M 12 14 Q 14 12 16 12 Q 18 12 20 14"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 12 18 Q 14 20 16 20 Q 18 20 20 18"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const LogoMark5 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 8 16 Q 8 10 16 8 Q 24 10 24 16 Q 24 22 16 24 Q 8 22 8 16"
      fill={color}
      opacity="0.15"
    />
    <path
      d="M 10 16 Q 10 11 16 9 Q 22 11 22 16 Q 22 21 16 23 Q 10 21 10 16"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="16" cy="16" r="1.5" fill={color} />
  </svg>
);

export const LogoMark6 = ({
  width = 32,
  height = 32,
  color = "#10b981",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 14 10 L 16 14 L 18 10"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 10 18 L 14 16 L 10 14"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 22 18 L 18 16 L 22 14"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 14 22 L 16 18 L 18 22"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="1.5" fill={color} />
  </svg>
);

export { LogoMark1 as default };
