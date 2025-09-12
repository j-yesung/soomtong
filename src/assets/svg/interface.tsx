type IconProps = {
  size?: number | string;
  color?: string;
};

export const TrashIcon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M9 6V4.5C9 3.67 9.67 3 10.5 3h3c.83 0 1.5.67 1.5 1.5V6" />
      <rect x="6.5" y="8" width="11" height="12" rx="1" />
      <line x1="10" y1="11" x2="10" y2="18" />
      <line x1="14" y1="11" x2="14" y2="18" />
    </svg>
  );
};
