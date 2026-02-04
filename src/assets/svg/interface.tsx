type IconProps = {
  size?: number | string;
  color?: string;
  rotate?: number;
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

export const HomeIcon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75v-4.5a2 2 0 0 1 4 0v4.5c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z" />
    </svg>
  );
};

export const CalendarIcon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2a.75.75 0 0 1 .75.75V4h6.5V2.75a.75.75 0 0 1 1.5 0V4h1.75A2.5 2.5 0 0 1 21 6.5v12a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-12A2.5 2.5 0 0 1 5.5 4h1.75V2.75A.75.75 0 0 1 8 2ZM4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9h-15Z"
      />
    </svg>
  );
};

export const HistoryIcon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="2" rx="1" />
      <rect x="3" y="11" width="18" height="2" rx="1" />
      <rect x="3" y="16" width="18" height="2" rx="1" />
    </svg>
  );
};

export const ArrowIcon = ({ size = 24, color = "currentColor", rotate }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        transform={`rotate(${rotate} 12 12)`}
        d="M6.46967 10.4697C6.17678 10.7626 6.17678 11.2374 6.46967 11.5303C6.76256 11.8232 7.23744 11.8232 7.53033 11.5303L11.25 7.81065L11.25 18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18L12.75 7.81065L16.4697 11.5303C16.7626 11.8232 17.2374 11.8232 17.5303 11.5303C17.8232 11.2374 17.8232 10.7626 17.5303 10.4697L12 4.93933L6.46967 10.4697Z"
      />
    </svg>
  );
};
