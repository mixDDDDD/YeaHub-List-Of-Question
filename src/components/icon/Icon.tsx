import type { SVGProps } from "react";
import {
  ArrowLeftIconBtn,
  ArrowRightIconBtn,
  ArrowRightIcon,
  ChevronBottomIcon,
  CopyIcon,
  EllipseIcon,
  LogoIcon,
  FooterLogoIcon,
} from "@/components/icon/icons";

const iconMap = {
  logo: LogoIcon,
  footerLogo: FooterLogoIcon,
  chevronBottom: ChevronBottomIcon,
  copy: CopyIcon,
  ellipse: EllipseIcon,
  arrowLeftBtn: ArrowLeftIconBtn,
  arrowRightBtn: ArrowRightIconBtn,
  arrowRight: ArrowRightIcon,
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = {
  name: IconName;
} & SVGProps<SVGSVGElement>;

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
}
