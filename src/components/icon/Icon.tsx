import type { SVGProps } from "react";
import { LogoIcon } from "@/components/icon/icons";

const iconMap = {
  logo: LogoIcon,
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
