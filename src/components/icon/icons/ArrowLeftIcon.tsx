import type { SVGProps } from "react";

export const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#6A0BFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7753 8.55806C13.0193 8.80214 13.0193 9.19786 12.7753 9.44194L8.84221 13.375H20.6667C21.0118 13.375 21.2917 13.6548 21.2917 14C21.2917 14.3452 21.0118 14.625 20.6667 14.625H8.84221L12.7753 18.5581C13.0193 18.8021 13.0193 19.1979 12.7753 19.4419C12.5312 19.686 12.1355 19.686 11.8914 19.4419L6.89139 14.4419C6.64731 14.1979 6.64731 13.8021 6.89139 13.5581L11.8914 8.55806C12.1355 8.31398 12.5312 8.31398 12.7753 8.55806Z"
        fill="#6A0BFF"
      />
    </svg>
  );
};
