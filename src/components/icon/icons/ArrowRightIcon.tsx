import type { SVGProps } from "react";

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="-0.5"
        width="27"
        height="27"
        rx="13.5"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 27)"
        stroke="#6A0BFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2247 19.4419C15.4688 19.686 15.8645 19.686 16.1086 19.4419L21.1086 14.4419C21.3527 14.1979 21.3527 13.8021 21.1086 13.5581L16.1086 8.55806C15.8645 8.31398 15.4688 8.31398 15.2247 8.55806C14.9807 8.80214 14.9807 9.19787 15.2247 9.44194L19.1578 13.375L7.33334 13.375C6.98817 13.375 6.70834 13.6548 6.70834 14C6.70834 14.3452 6.98817 14.625 7.33334 14.625L19.1578 14.625L15.2247 18.5581C14.9807 18.8021 14.9807 19.1979 15.2247 19.4419Z"
        fill="#6A0BFF"
      />
    </svg>
  );
};
