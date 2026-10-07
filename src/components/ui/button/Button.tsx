import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  variant?: ButtonVariant;
  destructive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={clsx(styles.button, styles[variant], className)}
    {...props}
  />
);
