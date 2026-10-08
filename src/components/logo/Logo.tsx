import styles from "./logo.module.css";
import { Icon } from "@/components/icon/Icon";

export const Logo = () => {
  return (
    <a href="#" className={styles.logo} aria-label="На главную">
      <Icon name="logo" aria-hidden="true" />
    </a>
  );
};

