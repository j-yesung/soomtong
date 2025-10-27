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

export const SingleArrowIcon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303L9.46967 12.5303C9.17678 12.2374 9.17678 11.7626 9.46967 11.4697L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L11.0607 12L14.5303 15.4697C14.8232 15.7626 14.8232 16.2374 14.5303 16.5303Z"
      />
    </svg>
  );
};
